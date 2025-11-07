import { Brain, Heart, Users, Lightbulb, DollarSign, Microscope, TrendingUp, Shield } from 'lucide-react';

export function Manifesto() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <img
            src="/4GB-LOGO.png"
            alt="Forgetful Bandits Logo"
            className="w-48 mx-auto mb-6"
          />
          <h1 className="text-5xl font-bold text-white mb-4">FORGETFUL BANDITS.ETH</h1>
          <p className="text-xl text-slate-300">An Alzheimer's and Dementia DAO Charity</p>
          <p className="text-lg text-pink-400 mt-2">Changing the way we fight Alzheimer's and Dementia</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gradient-to-r from-pink-900/30 to-slate-800 rounded-lg p-8 border border-pink-700/50">
            <div className="flex items-start gap-4 mb-4">
              <Heart className="text-pink-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-slate-300 leading-relaxed mb-3">
                  There are an estimated <strong className="text-white">57.4 million people living with dementia</strong> around the globe.
                  It is estimated that this number will rise to <strong className="text-white">152.8 million by 2050</strong>.
                </p>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Alzheimer's and Dementia don't just affect the elderly—<strong className="text-white">they can affect people in their 30s or 40s</strong>.
                  Usually, if you've been diagnosed with Alzheimer's or Dementia, the deterioration of your brain started within your 40s.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  We created Forgetful Bandits to address a critical question modern charities face: <strong className="text-pink-400">Where does the money go?</strong>
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <Users className="text-pink-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Why a DAO?</h2>
                <p className="text-slate-300 leading-relaxed mb-3">
                  A DAO, or Decentralized Autonomous Organization, provides a more secure and transparent way to manage charitable funds and make collective decisions.
                </p>
                <div className="space-y-3 text-slate-300">
                  <p>
                    <strong className="text-white">• Transparency:</strong> All votes and fund allocations are recorded on the blockchain, providing a tamper-proof and auditable record.
                  </p>
                  <p>
                    <strong className="text-white">• Democratic Decision Making:</strong> Every member has a voice in determining where funds go and what projects to support.
                  </p>
                  <p>
                    <strong className="text-white">• Smart Contract Automation:</strong> Voting processes are automated, ensuring fair and transparent governance.
                  </p>
                  <p>
                    <strong className="text-white">• Community Driven:</strong> Together we decide how to best fight Alzheimer's and Dementia.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <DollarSign className="text-pink-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">The $FGBNDT Token</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  FGBNDT was built as a decentralized autonomous organization (DAO), meaning that all members have a say in the future direction of the platform.
                  We're doing this with $FGBNDT tokens. By holding a membership, you'll automatically be able to claim your $FGBNDT.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Our membership approach allows us to focus on connections and stories. Members know they're going to be able to participate meaningfully.
                  Therefore, they can sit back, relax and take the time to learn about our mission and how they can contribute.
                </p>
                <div className="bg-slate-900/50 p-4 rounded-lg mt-4">
                  <h3 className="text-white font-semibold mb-3">Why Mint $FGBNDT?</h3>
                  <div className="space-y-2 text-slate-300 text-sm">
                    <p><strong className="text-pink-400">• Raise Funds:</strong> Support specific Alzheimer's and Dementia projects and initiatives</p>
                    <p><strong className="text-pink-400">• Governance Power:</strong> Vote on key decisions about fund allocation and project selection</p>
                    <p><strong className="text-pink-400">• Incentivize Participation:</strong> Reward members who contribute to the organization</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <TrendingUp className="text-pink-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">How We Distribute Funds</h2>
                <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Grants</h3>
                    <p className="text-sm">Support organizations providing services to people with Alzheimer's, including support groups, daycare centers, and respite care programs.</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Research Funding</h3>
                    <p className="text-sm">Fund clinical trials, laboratory studies, and epidemiological research into causes, treatments, and potential cures.</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Education Programs</h3>
                    <p className="text-sm">Public awareness campaigns, educational materials for patients and families, and training programs for healthcare professionals.</p>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">Direct Assistance</h3>
                    <p className="text-sm">Financial assistance for medications, transportation, and in-home care to help people with Alzheimer's live more independent lives.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <Lightbulb className="text-pink-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Projects We Support</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Traditional Projects</h3>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• Support groups for patients and caregivers</li>
                      <li>• Respite care programs providing relief for caregivers</li>
                      <li>• Clinical trials testing new treatments</li>
                      <li>• Public awareness campaigns</li>
                      <li>• Financial assistance programs</li>
                    </ul>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg mt-4">
                    <h3 className="text-white font-semibold mb-2">Tech-Focused Projects</h3>
                    <ul className="text-slate-300 space-y-2 text-sm">
                      <li>• Mobile apps with medication reminders and caregiving tips</li>
                      <li>• Virtual support groups connecting people online</li>
                      <li>• Telehealth services for remote care and consultations</li>
                      <li>• AI-powered tools to automate caregiving tasks and provide personalized support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <Microscope className="text-pink-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">The Science</h2>
                <p className="text-slate-300 leading-relaxed mb-3">
                  Alzheimer's disease is thought to be caused by the <strong className="text-white">abnormal build-up of proteins in and around brain cells</strong>.
                  One of the proteins involved is called amyloid, deposits of which form plaques around brain cells. The other protein is called tau, deposits of which form tangles within brain cells.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  The disease begins with a pre-symptomatic phase, during which time changes are occurring in the brain but no symptoms are present.
                  As plaques and tangles accumulate, brain cells are damaged and die, leading to cognitive decline.
                </p>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Alzheimer's vs. Dementia</h3>
                  <p className="text-slate-300 text-sm mb-2">
                    <strong className="text-pink-400">Dementia</strong> is a general term describing cognitive decline that can be caused by various conditions.
                  </p>
                  <p className="text-slate-300 text-sm">
                    <strong className="text-pink-400">Alzheimer's</strong> is a specific type of dementia caused by abnormal protein accumulation in the brain.
                    It is progressive and degenerative, typically worsening over time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="text-pink-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Marketing & Growth</h2>
                <div className="space-y-3 text-slate-300">
                  <p>
                    <strong className="text-white">• Marketing & Outreach:</strong> Creating compelling content to showcase our mission and attract supporters through videos, blog posts, and social media.
                  </p>
                  <p>
                    <strong className="text-white">• Partnerships & Collaborations:</strong> Working with artists, influencers, and organizations to amplify our message and reach wider audiences.
                  </p>
                  <p>
                    <strong className="text-white">• Incentives & Rewards:</strong> Offering benefits to early supporters and running campaigns to encourage community growth and participation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-pink-900/40 to-slate-800 rounded-lg p-8 border border-pink-700/50">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Join the Fight</h2>
            <p className="text-slate-300 text-center text-lg leading-relaxed mb-4">
              By becoming a member of Forgetful Bandits, you're not just acquiring tokens—you're joining a movement to revolutionize how we support
              Alzheimer's and Dementia research, care, and awareness. Together, we can make a real difference in millions of lives.
            </p>
            <p className="text-pink-400 text-center font-semibold text-lg">
              Where does the money go? With $FGBNDT DAO, you decide.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
