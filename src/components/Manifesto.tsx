import { Brain, Target, Users, Zap } from 'lucide-react';

export function Manifesto() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <img
            src="/4GB-SYM-LOGO.png"
            alt="Forgetful Bandits Logo"
            className="w-32 h-32 mx-auto mb-6"
          />
          <h1 className="text-5xl font-bold text-white mb-4">The Forgetful Bandits Manifesto</h1>
          <p className="text-xl text-slate-300">Embracing chaos, celebrating memory loss, thriving in the unknown</p>
        </div>

        <div className="space-y-8">
          <section className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <Brain className="text-pink-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Who We Are</h2>
                <p className="text-slate-300 leading-relaxed">
                  We are the Forgetful Bandits, a collective of digital nomads who embrace the beauty of impermanence.
                  In a world obsessed with perfect recall and permanent records, we celebrate the freedom that comes
                  from letting go. We don't just forget—we thrive in it.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <Target className="text-pink-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Our Philosophy</h2>
                <div className="text-slate-300 leading-relaxed space-y-3">
                  <p>
                    <strong className="text-white">Embrace Impermanence:</strong> Nothing lasts forever, and that's beautiful.
                    We reject the tyranny of permanent records and embrace the chaos of selective memory.
                  </p>
                  <p>
                    <strong className="text-white">Question Everything:</strong> Just because we forgot doesn't mean we're wrong.
                    Every moment is a fresh start, unburdened by the weight of the past.
                  </p>
                  <p>
                    <strong className="text-white">Collective Amnesia:</strong> Together we are strong, even if we can't remember
                    why we started. The journey is what matters, not the destination we may have forgotten.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <Zap className="text-pink-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">The $FGB Token</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  $FGB is more than just a token—it's a symbol of our collective forgetfulness. Holding $FGB means
                  you're part of something bigger, even if you can't quite remember what that is. It's the currency
                  of the present moment, the token of now.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Use $FGB to participate in governance, purchase exclusive merchandise, and prove you were here
                  (at least for this moment).
                </p>
              </div>
            </div>
          </section>

          <section className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <div className="flex items-start gap-4 mb-4">
              <Users className="text-pink-500 flex-shrink-0 mt-1" size={32} />
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Join Us</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Becoming a Forgetful Bandit is simple: let go. Release your grip on certainty. Embrace the
                  possibility that you might be wrong, or that you might have forgotten something important.
                  That's okay. We all have.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Connect your wallet, acquire some $FGB, and join our community. We may not remember your name
                  tomorrow, but today you're one of us.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-pink-900/40 to-slate-800 rounded-lg p-8 border border-pink-700/50">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Remember to Forget</h2>
            <p className="text-slate-300 text-center text-lg italic">
              "In forgetting, we find freedom. In chaos, we find truth. In the collective amnesia of the Forgetful Bandits,
              we find home."
            </p>
            <p className="text-pink-400 text-center mt-4 font-semibold">
              — Unknown Bandit (probably)
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
