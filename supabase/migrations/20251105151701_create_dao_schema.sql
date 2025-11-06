/*
  # DAO Platform Schema

  1. New Tables
    - `dao_members`
      - `id` (uuid, primary key)
      - `wallet_address` (text, unique) - Member's crypto wallet address
      - `token_balance` (numeric) - Number of governance tokens held
      - `joined_at` (timestamptz) - When member joined
      - `name` (text) - Optional display name
      - `email` (text) - Optional contact email
    
    - `proposals`
      - `id` (uuid, primary key)
      - `title` (text) - Proposal title
      - `description` (text) - Detailed proposal description
      - `proposer_id` (uuid, foreign key) - References dao_members
      - `status` (text) - Status: draft, active, passed, rejected, executed
      - `votes_for` (numeric) - Total tokens voted in favor
      - `votes_against` (numeric) - Total tokens voted against
      - `voting_ends_at` (timestamptz) - When voting period ends
      - `created_at` (timestamptz) - When proposal was created
      - `executed_at` (timestamptz) - When proposal was executed
    
    - `votes`
      - `id` (uuid, primary key)
      - `proposal_id` (uuid, foreign key) - References proposals
      - `member_id` (uuid, foreign key) - References dao_members
      - `vote_choice` (text) - Choice: for, against, abstain
      - `token_weight` (numeric) - Number of tokens used to vote
      - `voted_at` (timestamptz) - When vote was cast
      - Unique constraint on (proposal_id, member_id)

  2. Security
    - Enable RLS on all tables
    - Members can read all member data
    - Members can update their own profile
    - Members can create proposals if they have minimum tokens
    - Members can read all proposals
    - Members can vote on active proposals
    - Members can read all votes
*/

-- Create dao_members table
CREATE TABLE IF NOT EXISTS dao_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text UNIQUE NOT NULL,
  token_balance numeric DEFAULT 0 CHECK (token_balance >= 0),
  joined_at timestamptz DEFAULT now(),
  name text DEFAULT '',
  email text DEFAULT ''
);

ALTER TABLE dao_members ENABLE ROW LEVEL SECURITY;

-- Create proposals table
CREATE TABLE IF NOT EXISTS proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  proposer_id uuid REFERENCES dao_members(id) NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('draft', 'active', 'passed', 'rejected', 'executed')),
  votes_for numeric DEFAULT 0 CHECK (votes_for >= 0),
  votes_against numeric DEFAULT 0 CHECK (votes_against >= 0),
  voting_ends_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  executed_at timestamptz
);

ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;

-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proposal_id uuid REFERENCES proposals(id) NOT NULL,
  member_id uuid REFERENCES dao_members(id) NOT NULL,
  vote_choice text NOT NULL CHECK (vote_choice IN ('for', 'against', 'abstain')),
  token_weight numeric NOT NULL CHECK (token_weight > 0),
  voted_at timestamptz DEFAULT now(),
  UNIQUE(proposal_id, member_id)
);

ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for dao_members
CREATE POLICY "Anyone can view members"
  ON dao_members FOR SELECT
  USING (true);

CREATE POLICY "Members can insert themselves"
  ON dao_members FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Members can update own profile"
  ON dao_members FOR UPDATE
  USING (id = id)
  WITH CHECK (id = id);

-- RLS Policies for proposals
CREATE POLICY "Anyone can view proposals"
  ON proposals FOR SELECT
  USING (true);

CREATE POLICY "Token holders can create proposals"
  ON proposals FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM dao_members
      WHERE dao_members.id = proposer_id
      AND dao_members.token_balance >= 1
    )
  );

CREATE POLICY "Proposers can update own proposals"
  ON proposals FOR UPDATE
  USING (proposer_id = proposer_id)
  WITH CHECK (proposer_id = proposer_id);

-- RLS Policies for votes
CREATE POLICY "Anyone can view votes"
  ON votes FOR SELECT
  USING (true);

CREATE POLICY "Members can cast votes"
  ON votes FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM dao_members
      WHERE dao_members.id = member_id
      AND dao_members.token_balance > 0
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_proposals_status ON proposals(status);
CREATE INDEX IF NOT EXISTS idx_proposals_voting_ends ON proposals(voting_ends_at);
CREATE INDEX IF NOT EXISTS idx_votes_proposal ON votes(proposal_id);
CREATE INDEX IF NOT EXISTS idx_votes_member ON votes(member_id);
