import { ArrowRight, Heart, Users, Shield, Vote, TrendingUp } from 'lucide-react';

interface HomepageProps {
  onNavigate: (view: 'shop' | 'manifesto') => void;
  onSignIn: () => void;
}

export function Homepage({ onNavigate, onSignIn }: HomepageProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen flex items-center justify-center px-4 border-b border-white/10">
        <div className="max-w-6xl mx-auto text-center py-20">
          <img
            src="/4GB-LOGO.png"
            alt="Forgetful Bandits Logo"
            className="w-64 mx-auto mb-8 opacity-90"
          />
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            FORGETFUL BANDITS
          </h1>
          <p className="text-xl md:text-2xl text-white/70 mb-4 max-w-3xl mx-auto">
            A Decentralized Autonomous Organization fighting Alzheimer's and Dementia
          </p>
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Transparent. Democratic. Community-driven charity through blockchain technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onSignIn}
              className="px-8 py-4 bg-white text-black text-lg font-semibold hover:bg-white/90 transition-all flex items-center gap-2 group"
            >
              Become a Member
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button
              onClick={() => onNavigate('manifesto')}
              className="px-8 py-4 border-2 border-white text-white text-lg font-semibold hover:bg-white hover:text-black transition-all"
            >
              Read Our Mission
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">The Crisis</h2>
          <p className="text-xl text-white/70 text-center mb-16 max-w-3xl mx-auto">
            Understanding the scale of Alzheimer's and Dementia worldwide
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 border border-white/10">
              <p className="text-5xl md:text-6xl font-bold mb-4">57.4M</p>
              <p className="text-white/70 text-lg">People living with dementia globally today</p>
            </div>
            <div className="text-center p-8 border border-white/10">
              <p className="text-5xl md:text-6xl font-bold mb-4">152.8M</p>
              <p className="text-white/70 text-lg">Projected cases by 2050 without intervention</p>
            </div>
            <div className="text-center p-8 border border-white/10">
              <p className="text-5xl md:text-6xl font-bold mb-4">30s-40s</p>
              <p className="text-white/70 text-lg">Brain deterioration can start this early</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">Why a DAO?</h2>
          <p className="text-xl text-white/70 text-center mb-16 max-w-3xl mx-auto">
            Blockchain technology ensures every donation is transparent and accountable
          </p>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-6">
              <Shield className="flex-shrink-0 mt-1" size={40} />
              <div>
                <h3 className="text-2xl font-bold mb-3">Full Transparency</h3>
                <p className="text-white/70 leading-relaxed">
                  All votes and fund allocations are recorded on the blockchain, providing a tamper-proof and auditable record. You always know where the money goes.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <Vote className="flex-shrink-0 mt-1" size={40} />
              <div>
                <h3 className="text-2xl font-bold mb-3">Democratic Governance</h3>
                <p className="text-white/70 leading-relaxed">
                  Every member has voting power through $FGBNDT tokens. You decide which projects receive funding and how we fight this disease.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <Users className="flex-shrink-0 mt-1" size={40} />
              <div>
                <h3 className="text-2xl font-bold mb-3">Community Driven</h3>
                <p className="text-white/70 leading-relaxed">
                  No single person controls the organization. Decisions are made collectively by members who care about making a real difference.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <TrendingUp className="flex-shrink-0 mt-1" size={40} />
              <div>
                <h3 className="text-2xl font-bold mb-3">Smart Contract Automation</h3>
                <p className="text-white/70 leading-relaxed">
                  Voting and fund distribution happen automatically through code, ensuring fair and transparent governance without human interference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center">How It Works</h2>
          <p className="text-xl text-white/70 text-center mb-16 max-w-3xl mx-auto">
            Simple steps to join the fight against Alzheimer's and Dementia
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Become a Member</h3>
              <p className="text-white/70 leading-relaxed">
                Sign up and receive your membership. Connect your wallet to participate in governance and claim your $FGBNDT tokens.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Participate & Vote</h3>
              <p className="text-white/70 leading-relaxed">
                Use your $FGBNDT tokens to vote on proposals. Decide which research projects, care programs, and initiatives receive funding.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Make an Impact</h3>
              <p className="text-white/70 leading-relaxed">
                Watch as your contributions directly fund breakthrough research, support groups, care programs, and tech solutions that save lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-24 border-b border-white/10 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-12">
            <Heart className="flex-shrink-0 mt-1" size={48} />
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-white/70 leading-relaxed mb-4">
                We created Forgetful Bandits to address a critical question modern charities face: <span className="text-white font-semibold">Where does the money go?</span>
              </p>
              <p className="text-lg text-white/70 leading-relaxed">
                Through blockchain technology and democratic governance, we ensure complete transparency in how funds are raised and distributed. Every member has a voice in determining which projects to support, from traditional research and care programs to cutting-edge AI and telehealth solutions.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3">Traditional Support</h3>
              <ul className="text-white/70 space-y-2">
                <li>• Research funding and clinical trials</li>
                <li>• Support groups for patients and caregivers</li>
                <li>• Respite care and financial assistance</li>
                <li>• Public awareness campaigns</li>
              </ul>
            </div>
            <div className="p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-3">Tech-Focused Innovation</h3>
              <ul className="text-white/70 space-y-2">
                <li>• AI-powered caregiving tools</li>
                <li>• Telehealth services and consultations</li>
                <li>• Mobile apps for medication reminders</li>
                <li>• Virtual support group platforms</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('manifesto')}
              className="px-8 py-3 border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all inline-flex items-center gap-2"
            >
              Read Full Manifesto
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Join the Movement</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            By becoming a member of Forgetful Bandits, you're not just acquiring tokens—you're joining a movement to revolutionize how we support Alzheimer's and Dementia research, care, and awareness.
          </p>
          <p className="text-2xl font-semibold mb-12">
            Together, we can make a real difference in millions of lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onSignIn}
              className="px-8 py-4 bg-white text-black text-lg font-semibold hover:bg-white/90 transition-all flex items-center gap-2 group"
            >
              Get Started Today
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button
              onClick={() => onNavigate('shop')}
              className="px-8 py-4 border-2 border-white text-white text-lg font-semibold hover:bg-white hover:text-black transition-all"
            >
              Visit Shop
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
