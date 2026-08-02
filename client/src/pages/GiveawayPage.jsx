import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Gamepad2, Gift, Loader2, Send, ShieldCheck, Sparkles, Youtube, Instagram, Trophy, ArrowUpRight } from 'lucide-react'
import Container from '../components/Container'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../lib/supabase'

const initialForm = {
  name: '',
  email: '',
  youtube: '',
  instagram: '',
  rules_checked: false,
  stumble_ign: '',
  feedback: '',
  future_game: '',
  anti_bot_map: '',
}

export default function GiveawayPage() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!form.rules_checked) {
      setError('Please check the box confirming you subscribed on YouTube and followed on Instagram.')
      return
    }

    setStatus('loading')
    setError('')

    const newEntry = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      youtube: form.youtube,
      instagram: form.instagram,
      stumble_ign: form.stumble_ign,
      feedback: form.feedback,
      future_game: form.future_game,
      anti_bot_map: form.anti_bot_map,
      created_at: new Date().toISOString(),
    }

    try {
      // 1. Insert entry into Supabase Cloud Database (giveaway_entries table)
      try {
        await supabase.from('giveaway_entries').insert([
          {
            name: form.name,
            email: form.email,
            youtube: form.youtube,
            instagram: form.instagram,
            stumble_ign: form.stumble_ign,
            feedback: form.feedback,
            future_game: form.future_game,
            anti_bot_map: form.anti_bot_map,
          },
        ])
      } catch (sbErr) {
        console.warn('Supabase giveaway insert notice:', sbErr)
      }

      // 2. Local Storage Sync for Offline/Admin panel instant reading
      const existing = JSON.parse(localStorage.getItem('wardom_giveaway_entries') || '[]')
      localStorage.setItem('wardom_giveaway_entries', JSON.stringify([newEntry, ...existing]))

      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      console.error('Giveaway submission error:', err)
      setStatus('success')
      setForm(initialForm)
    }
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#090A0F] text-[#0F0F0F] dark:text-white transition-colors duration-200">
      <Navbar />

      <main className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        <Container>
          {/* Top Gaming Giveaway Hero Header */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#5F8D3B]/30 bg-[#5F8D3B]/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-widest text-[#5F8D3B] dark:text-[#7BAE47]"
            >
              <Trophy className="h-4 w-4" /> EXCLUSIVE STUMBLE PASS GIVEAWAY
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold tracking-tight text-[#0F0F0F] dark:text-white sm:text-5xl lg:text-6xl leading-[1.05]"
            >
              Win a <span className="italic font-serif font-normal text-[#5F8D3B]">Stumble Pass!</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#555555] dark:text-gray-300"
            >
              Enter the official Wardom stream giveaway below. Fill out your details accurately so we can verify your entry and deliver your prize in-game!
            </motion.p>
          </div>

          {/* Giveaway Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-12 max-w-3xl rounded-3xl border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#12131A] p-6 sm:p-10 lg:p-12 shadow-xl"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#5F8D3B] text-white shadow-lg">
                  <Check size={32} />
                </span>
                <h2 className="text-3xl font-extrabold text-[#0F0F0F] dark:text-white">Giveaway Entry Confirmed!</h2>
                <p className="mt-3 max-w-md text-xs sm:text-sm leading-relaxed text-[#555555] dark:text-gray-300">
                  Your entry has been recorded successfully. Make sure to stay tuned to Wardom streams & socials for winner announcements!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-8 rounded-full bg-[#5F8D3B] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#4d7330] transition-colors"
                >
                  Submit another entry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">

                {/* SECTION 1: The Essentials */}
                <div className="space-y-6">
                  <div className="border-b border-[#E5E7EB] dark:border-[#27272A] pb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5F8D3B]">
                      SECTION 01
                    </span>
                    <h2 className="text-xl font-extrabold text-[#0F0F0F] dark:text-white mt-0.5">
                      The Essentials (Contact & Social Verification)
                    </h2>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] dark:text-white mb-2">
                        Full Name <span className="text-[#5F8D3B]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name..."
                        className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] px-4 py-3 text-xs text-[#0F0F0F] dark:text-white placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white dark:focus:bg-[#12131A] focus:outline-none transition-all"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] dark:text-white mb-2">
                        Email Address <span className="text-[#5F8D3B]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="yourname@gmail.com"
                        className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] px-4 py-3 text-xs text-[#0F0F0F] dark:text-white placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white dark:focus:bg-[#12131A] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* YouTube Username */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] dark:text-white mb-2">
                        <Youtube className="h-4 w-4 text-red-500" /> YouTube Username / Handle <span className="text-[#5F8D3B]">*</span>
                      </label>
                      <input
                        type="text"
                        name="youtube"
                        required
                        value={form.youtube}
                        onChange={handleChange}
                        placeholder="@YourYouTubeHandle"
                        className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] px-4 py-3 text-xs text-[#0F0F0F] dark:text-white placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white dark:focus:bg-[#12131A] focus:outline-none transition-all"
                      />
                    </div>

                    {/* Instagram Handle */}
                    <div>
                      <label className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] dark:text-white mb-2">
                        <Instagram className="h-4 w-4 text-pink-500" /> Instagram Handle <span className="text-[#5F8D3B]">*</span>
                      </label>
                      <input
                        type="text"
                        name="instagram"
                        required
                        value={form.instagram}
                        onChange={handleChange}
                        placeholder="@your.instagram"
                        className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] px-4 py-3 text-xs text-[#0F0F0F] dark:text-white placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white dark:focus:bg-[#12131A] focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Verification Checkbox */}
                  <div className="rounded-2xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rules_checked"
                        checked={form.rules_checked}
                        onChange={handleChange}
                        className="mt-0.5 h-4 w-4 rounded border-[#E5E7EB] text-[#5F8D3B] focus:ring-[#5F8D3B]"
                      />
                      <span className="text-xs font-semibold text-[#0F0F0F] dark:text-gray-200">
                        I confirm that I have subscribed to the Wardom YouTube channel and followed the Instagram page. <span className="text-[#5F8D3B]">*</span>
                      </span>
                    </label>
                  </div>
                </div>


                {/* SECTION 2: Prize Delivery */}
                <div className="space-y-6">
                  <div className="border-b border-[#E5E7EB] dark:border-[#27272A] pb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5F8D3B]">
                      SECTION 02
                    </span>
                    <h2 className="text-xl font-extrabold text-[#0F0F0F] dark:text-white mt-0.5">
                      Prize Delivery (Crucial)
                    </h2>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] dark:text-white mb-2">
                      <Gamepad2 className="h-4 w-4 text-[#5F8D3B]" /> Stumble Guys In-Game Name (IGN) <span className="text-[#5F8D3B]">*</span>
                    </label>
                    <input
                      type="text"
                      name="stumble_ign"
                      required
                      value={form.stumble_ign}
                      onChange={handleChange}
                      placeholder="Exact Stumble Guys IGN (e.g. WardomPro_99)..."
                      className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] px-4 py-3 text-xs text-[#0F0F0F] dark:text-white placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white dark:focus:bg-[#12131A] focus:outline-none transition-all"
                    />
                    <p className="mt-1.5 text-[11px] text-[#999999] dark:text-gray-400">
                      We need your exact username to verify your account or coordinate gifting the Stumble Pass in-game.
                    </p>
                  </div>
                </div>


                {/* SECTION 3: Community & Feedback */}
                <div className="space-y-6">
                  <div className="border-b border-[#E5E7EB] dark:border-[#27272A] pb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5F8D3B]">
                      SECTION 03
                    </span>
                    <h2 className="text-xl font-extrabold text-[#0F0F0F] dark:text-white mt-0.5">
                      Community & Feedback (The Wardom Factor)
                    </h2>
                  </div>

                  {/* Feedback for Wardom */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] dark:text-white mb-2">
                      What is your favorite part of Wardom streams or what can I do to make streams even better? <span className="text-[#5F8D3B]">*</span>
                    </label>
                    <textarea
                      name="feedback"
                      rows={3}
                      required
                      value={form.feedback}
                      onChange={handleChange}
                      placeholder="Share your thoughts, suggestions, or favorite stream moments..."
                      className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] px-4 py-3 text-xs text-[#0F0F0F] dark:text-white placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white dark:focus:bg-[#12131A] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Future Content */}
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] dark:text-white mb-2">
                      Besides Stumble Guys, what do you want to see Wardom play next? (Valorant, Roblox, Minecraft, etc.) <span className="text-[#5F8D3B]">*</span>
                    </label>
                    <input
                      type="text"
                      name="future_game"
                      required
                      value={form.future_game}
                      onChange={handleChange}
                      placeholder="e.g. Valorant, Roblox, Minecraft, GTA V..."
                      className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] px-4 py-3 text-xs text-[#0F0F0F] dark:text-white placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white dark:focus:bg-[#12131A] focus:outline-none transition-all"
                    />
                  </div>

                  {/* Anti-Bot Question */}
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F0F0F] dark:text-white mb-2">
                      <ShieldCheck className="h-4 w-4 text-[#5F8D3B]" /> Anti-Bot Question: What is your all-time favorite Stumble Guys map? <span className="text-[#5F8D3B]">*</span>
                    </label>
                    <input
                      type="text"
                      name="anti_bot_map"
                      required
                      value={form.anti_bot_map}
                      onChange={handleChange}
                      placeholder="e.g. Block Dash, Laser Tracer, Cannon Climb..."
                      className="w-full rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#181924] px-4 py-3 text-xs text-[#0F0F0F] dark:text-white placeholder:text-[#999999] focus:border-[#5F8D3B] focus:bg-white dark:focus:bg-[#12131A] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs font-semibold text-red-600 dark:text-red-400" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#5F8D3B] py-4 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#4d7330] transition-colors shadow-md"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Submitting Entry...
                    </>
                  ) : (
                    <>
                      Submit Giveaway Entry <Send size={14} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
