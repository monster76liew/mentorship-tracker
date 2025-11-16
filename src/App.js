import React, { useState } from 'react';
import { Calendar, User, Target, MessageSquare, BarChart3, Users, Tag, Clock, CheckCircle2, AlertCircle, TrendingUp, Heart, Lightbulb, X, Plus } from 'lucide-react';

const App = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [showMenteeDetailModal, setShowMenteeDetailModal] = useState(false);
  const [selectedMentee, setSelectedMentee] = useState(null);
  
  const [onboardingData, setOnboardingData] = useState({ gap: '', value: '', support: '' });
  const [storyData, setStoryData] = useState({ moment: '', figuring: '', supportType: '' });
  
  // Goals state - mentee can add/update goals
  const [goals, setGoals] = useState([
    { id: 1, title: "Complete PM fundamentals course", status: "done", dueDate: "2024-11-05" },
    { id: 2, title: "Interview 3 Product Managers", status: "in-progress", dueDate: "2024-11-20" },
    { id: 3, title: "Build sample product roadmap", status: "not-started", dueDate: "2024-11-30" },
    { id: 4, title: "Attend PM networking event", status: "in-progress", dueDate: "2024-11-25" }
  ]);
  const [newGoal, setNewGoal] = useState({ title: '', dueDate: '' });
  
  // Weekly reflections
  const [reflections, setReflections] = useState([
    { week: "Nov 8-15", win: "Completed first PM course module", support: 4, date: "2024-11-15" }
  ]);
  const [newReflection, setNewReflection] = useState({ win: '', support: null });

  // Add goal function
  const addGoal = () => {
    if (newGoal.title && newGoal.dueDate) {
      setGoals([...goals, {
        id: goals.length + 1,
        title: newGoal.title,
        status: 'not-started',
        dueDate: newGoal.dueDate
      }]);
      setNewGoal({ title: '', dueDate: '' });
      setShowGoalModal(false);
    }
  };

  // Toggle goal status (click to cycle: not-started → in-progress → done)
  const toggleGoalStatus = (goalId) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const statusOrder = ['not-started', 'in-progress', 'done'];
        const currentIndex = statusOrder.indexOf(goal.status);
        const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length];
        return { ...goal, status: nextStatus };
      }
      return goal;
    }));
  };

  // Add reflection
  const addReflection = () => {
    if (newReflection.win && newReflection.support) {
      const today = new Date();
      setReflections([{
        week: `Week of ${today.toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}`,
        win: newReflection.win,
        support: newReflection.support,
        date: new Date().toISOString().split('T')[0]
      }, ...reflections]);
      setNewReflection({ win: '', support: null });
      setShowReflectionModal(false);
    }
  };
  const mentorData = {
    name: "Sarah Chen",
    expertise: ["Product Management", "Career Transitions", "Tech Leadership"],
    mentees: [
      { name: "Alex Kumar", goal: "Transition to Product Management", lastSession: "2024-11-10", nextSession: "2024-11-17", status: "active", goalsCompleted: 2, goalsTotal: 4 },
      { name: "Jamie Lin", goal: "Senior Developer to Tech Lead", lastSession: "2024-11-08", nextSession: "2024-11-15", status: "needs-attention", goalsCompleted: 1, goalsTotal: 3 }
    ]
  };

  const menteeData = {
    name: "Alex Kumar",
    mentor: "Sarah Chen",
    mentorExpertise: ["Product Management", "Career Transitions", "Tech Leadership"],
    goal: "Transition to Product Management from Engineering",
    nextSession: "2024-11-17",
    lastSession: "2024-11-10",
    goals: [
      { id: 1, title: "Complete PM fundamentals course", status: "done", dueDate: "2024-11-05" },
      { id: 2, title: "Interview 3 Product Managers", status: "in-progress", dueDate: "2024-11-20" },
      { id: 3, title: "Build sample product roadmap", status: "not-started", dueDate: "2024-11-30" },
      { id: 4, title: "Attend PM networking event", status: "in-progress", dueDate: "2024-11-25" }
    ],
    sessions: [
      { date: "2024-11-10", prepNotes: "Want to discuss PM interview preparation and portfolio building", takeaways: ["Focus on storytelling in case studies", "Start documenting current projects with PM lens"], actionItems: ["Draft 2 case studies by next week", "Research 3 companies hiring APMs"] },
      { date: "2024-11-03", prepNotes: "Confused about APM vs PM roles, need career path clarity", takeaways: ["APM programs are competitive but great for career switchers", "Focus on transferable skills from engineering"], actionItems: ["List out technical projects with business impact", "Connect with 2 APMs on LinkedIn"] }
    ]
  };

  const coordinatorData = {
    name: "SheBuild",
    programName: "Mentorship Program",
    totalPairs: 8,
    activePairs: 6,
    needsAttention: 2,
    pairs: [
      { mentee: "Alex Kumar", mentor: "Sarah Chen", status: "active", lastActivity: "2 days ago", sessionCount: 6, field: "Product Management" },
      { mentee: "Jamie Lin", mentor: "Sarah Chen", status: "needs-attention", lastActivity: "6 days ago", sessionCount: 4, field: "Tech Leadership" },
      { mentee: "Chris Park", mentor: "Michael Wong", status: "active", lastActivity: "1 day ago", sessionCount: 8, field: "Data Science" },
      { mentee: "Sam Rodriguez", mentor: "Michael Wong", status: "active", lastActivity: "3 days ago", sessionCount: 5, field: "ML Engineering" },
      { mentee: "Taylor Swift", mentor: "Linda Johnson", status: "needs-attention", lastActivity: "12 days ago", sessionCount: 2, field: "Cloud Architecture" },
      { mentee: "Jordan Lee", mentor: "Linda Johnson", status: "active", lastActivity: "1 day ago", sessionCount: 7, field: "DevOps" }
    ]
  };

const LandingPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100 flex flex-col items-center justify-center p-8 relative overflow-hidden">
    {/* Decorative elements */}
    <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-3xl"></div>
    
    <div className="max-w-3xl text-center mb-12 relative z-10">
      <div className="mb-4">
        <span className="text-6xl">🌱</span>
      </div>
      <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
        Mentorship Tracker
      </h1>
      <p className="text-xl text-gray-600 mb-8 font-medium">
        You don't have to figure it out alone
      </p>
      
      <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 mb-8 hover:shadow-3xl transition-all duration-300">
        <div className="mb-6">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-3">A Gift of Gratitude</p>
        </div>
        <p className="text-gray-700 italic leading-relaxed text-lg mb-4">
          "Built with gratitude for Davis, who showed me that great mentorship isn't just about advice - 
          it's about truly seeing someone's journey. This tool is my way of giving back what you gave me: 
          structure, care, and visibility. Thank you for believing in me."
        </p>
        <p className="text-gray-500 font-semibold">— </p>
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 italic">
            "Every journey begins with a single step. You're already on your way." 🌟
          </p>
        </div>
      </div>
    </div>
    
    <div className="flex flex-wrap gap-6 justify-center relative z-10">
      <button 
        onClick={() => setCurrentView('onboarding')}
        className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
      >
        <User size={28} />
        <div className="text-left">
          <div>I'm a Mentee</div>
          <div className="text-xs text-blue-100 font-normal">Start your journey</div>
        </div>
      </button>
      
      <button 
        onClick={() => setCurrentView('mentor')}
        className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
      >
        <Users size={28} />
        <div className="text-left">
          <div>I'm a Mentor</div>
          <div className="text-xs text-green-100 font-normal">Guide others forward</div>
        </div>
      </button>
      
      <button 
        onClick={() => setCurrentView('coordinator')}
        className="group bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
      >
        <BarChart3 size={28} />
        <div className="text-left">
          <div>Coordinator View</div>
          <div className="text-xs text-purple-100 font-normal">See the bigger picture</div>
        </div>
      </button>
    </div>
    
    <div className="mt-12 text-center relative z-10">
      <p className="text-gray-500 text-sm italic">
        "In every person who has ever felt lost, there's a story waiting to unfold." 💫
      </p>
    </div>
  </div>
);

const OnboardingPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
    <nav className="bg-white/80 backdrop-blur-lg border-b border-purple-100 px-8 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Welcome! 🌸</h1>
        <p className="text-sm text-gray-600 mt-1">Let's understand your journey together</p>
      </div>
      <button onClick={() => setCurrentView('landing')} className="text-purple-600 hover:text-purple-800 transition">← Back</button>
    </nav>

    <div className="max-w-3xl mx-auto p-8">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Step 1 of 2</span>
          <span className="text-sm text-purple-600 font-medium">Understanding Your Needs</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-1/2 transition-all duration-500"></div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-2xl">
            <Lightbulb className="text-white" size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Your Starting Point</h2>
            <p className="text-gray-600 mt-1">Every great journey begins with honesty</p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Take your time. There are no wrong answers here - just your truth. We're here to support you, exactly where you are. 💙
        </p>

        <div className="space-y-8">
          <div>
            <label className="block text-gray-800 font-semibold mb-3 text-lg flex items-start gap-2">
              <span className="text-2xl">💭</span>
              <span>What gap have you been trying to navigate alone?</span>
            </label>
            <p className="text-sm text-gray-500 mb-3 ml-8 italic">It's okay if you're still figuring out how to name it</p>
            <textarea
              value={onboardingData.gap}
              onChange={(e) => setOnboardingData({...onboardingData, gap: e.target.value})}
              className="w-full border-2 border-purple-200 rounded-2xl p-5 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none resize-none transition-all duration-300 bg-purple-50/30"
              rows="4"
              placeholder="Share what's been on your mind... there's no judgment here."
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-3 text-lg flex items-start gap-2">
              <span className="text-2xl">🌟</span>
              <span>What would make this mentorship truly valuable to you?</span>
            </label>
            <p className="text-sm text-gray-500 mb-3 ml-8 italic">Dream a little - what would success feel like?</p>
            <textarea
              value={onboardingData.value}
              onChange={(e) => setOnboardingData({...onboardingData, value: e.target.value})}
              className="w-full border-2 border-blue-200 rounded-2xl p-5 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 focus:outline-none resize-none transition-all duration-300 bg-blue-50/30"
              rows="4"
              placeholder="Imagine yourself 3 months from now... what changed?"
            />
          </div>

          <div>
            <label className="block text-gray-800 font-semibold mb-3 text-lg flex items-start gap-2">
              <span className="text-2xl">🤗</span>
              <span>How supported do you feel right now?</span>
            </label>
            <p className="text-sm text-gray-500 mb-4 ml-8 italic">Honest answer - this helps us understand where to start</p>
            <div className="flex items-center gap-3 mb-4">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setOnboardingData({...onboardingData, support: level})}
                  className={`w-16 h-16 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    onboardingData.support === level
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-110 shadow-xl'
                      : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 hover:scale-105 hover:shadow-lg'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500 px-2">
              <span>Not supported</span>
              <span>Very supported</span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200">
          <button
            onClick={() => setCurrentView('story')}
            className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:from-purple-600 hover:via-blue-600 hover:to-pink-600 text-white py-5 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            <span>I'm ready to continue</span>
            <span>→</span>
          </button>
          <p className="text-center text-sm text-gray-500 mt-4 italic">
            You're doing great. One step at a time. 🌱
          </p>
        </div>
      </div>
    </div>
  </div>
);

  const StoryModulePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Your Journey So Far</h1>
        <div className="flex gap-4">
          <button onClick={() => setCurrentView('onboarding')} className="text-gray-600 hover:text-gray-800">← Back</button>
          <button onClick={() => setCurrentView('landing')} className="text-blue-600 hover:text-blue-800">Home</button>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-pink-600" size={32} />In every person who has ever felt lost, there's a story waiting to unfold." 💫
            <h2 className="text-3xl font-bold text-gray-800">Mentee Story Module</h2>
          </div>
          <p className="text-gray-600 mb-8">Let your mentor understand your emotional arc. This helps create a deeper, more meaningful connection.</p>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-lg">What's a moment that shaped your path?</label>
              <textarea value={storyData.moment} onChange={(e) => setStoryData({...storyData, moment: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-pink-500 focus:outline-none resize-none" rows="4" placeholder="Share a pivotal moment in your journey..." />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-lg">What are you still figuring out?</label>
              <textarea value={storyData.figuring} onChange={(e) => setStoryData({...storyData, figuring: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-pink-500 focus:outline-none resize-none" rows="4" placeholder="What questions keep you up at night?" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-lg">What kind of support feels most helpful right now?</label>
              <textarea value={storyData.supportType} onChange={(e) => setStoryData({...storyData, supportType: e.target.value})} className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-pink-500 focus:outline-none resize-none" rows="4" placeholder="Describe the support that would make the biggest difference..." />
            </div>
          </div>
          <button onClick={() => setCurrentView('mentee')} className="w-full mt-8 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold text-lg transition">Continue to Dashboard →</button>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <p className="text-blue-800">💡 <span className="font-semibold">Your mentor will see this story</span> to better understand your journey and provide more personalized guidance.</p>
        </div>
      </div>
    </div>
  );

const MenteeDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
    <nav className="bg-white/80 backdrop-blur-lg border-b border-purple-100 px-8 py-4 flex justify-between items-center shadow-sm">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Your Mentorship Journey</h1>
        <p className="text-sm text-gray-600 mt-1">You're not alone in this. Let's grow together 🌱</p>
      </div>
      <button onClick={() => setCurrentView('landing')} className="text-purple-600 hover:text-purple-800 transition flex items-center gap-1">
        ← Back to Home
      </button>
    </nav>

    <div className="max-w-6xl mx-auto p-8">
      {/* Mentor Info Card */}
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-3xl p-8 mb-8 shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div>
            <p className="text-blue-100 text-sm mb-2 flex items-center gap-2">
              <span className="text-lg">👤</span>
              <span>Your Mentor</span>
            </p>
            <h2 className="text-4xl font-bold mb-4">{menteeData.mentor}</h2>
            <div className="flex flex-wrap gap-2">
              {menteeData.mentorExpertise.map((exp, i) => (
                <span key={i} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition">
                  <Tag size={16} />
                  {exp}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-blue-100 text-sm mb-2">Next Session</p>
            <p className="text-3xl font-bold flex items-center gap-3 justify-end">
              <Calendar size={32} />
              Nov 17, 2024
            </p>
            <p className="text-blue-100 text-sm mt-2">📍 In 3 days</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-white to-purple-50 rounded-2xl p-6 mb-8 shadow-lg border border-purple-100">
        <p className="text-gray-700 text-lg leading-relaxed">
          Hi <span className="font-bold text-purple-600">{menteeData.name}</span> 👋
          <br/>
          <span className="text-gray-600 text-base mt-2 block">
            Remember: Progress isn't always linear. Every small step forward is a victory worth celebrating. You're doing better than you think. 💜
          </span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-semibold">Sessions Completed</span>
            <div className="bg-blue-100 p-3 rounded-xl">
              <MessageSquare className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 mb-2">{menteeData.sessions.length}</p>
          <p className="text-sm text-gray-500">Last: {menteeData.lastSession}</p>
          <p className="text-xs text-blue-600 mt-2 font-medium">🌟 Keep the momentum going!</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-semibold">Goals Progress</span>
            <div className="bg-green-100 p-3 rounded-xl">
              <Target className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 mb-2">
            {goals.filter(g => g.status === 'done').length}/{goals.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500" style={{width: `${(goals.filter(g => g.status === 'done').length / goals.length) * 100}%`}}></div>
          </div>
          <p className="text-xs text-green-600 mt-2 font-medium">🎯 You're making progress!</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-semibold">Weekly Check-In</span>
            <div className="bg-pink-100 p-3 rounded-xl">
              <Heart className="text-pink-600" size={24} />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2 mb-4">Share your weekly wins</p>
          <button onClick={() => setShowReflectionModal(true)} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02]">
            Submit Check-In
          </button>
        </div>
      </div>

      {/* Weekly Reflections */}
      {reflections.length > 0 && (
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-pink-100">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <div className="bg-pink-100 p-3 rounded-xl">
              <Heart size={28} className="text-pink-600" />
            </div>
            <span>Your Weekly Reflections</span>
          </h3>
          <div className="space-y-4">
            {reflections.map((reflection, idx) => (
              <div key={idx} className="border-l-4 border-pink-500 pl-6 py-4 bg-gradient-to-r from-pink-50 to-white rounded-r-2xl hover:shadow-md transition">
                <p className="text-sm text-gray-500 mb-2 font-medium">{reflection.week}</p>
                <p className="text-gray-800 font-semibold text-lg mb-3">"{reflection.win}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">How supported:</span>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(level => (
                      <div key={level} className={`w-8 h-8 rounded-full ${level <= reflection.support ? 'bg-gradient-to-br from-pink-500 to-rose-500' : 'bg-gray-200'} transition-all duration-300`}></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goals Section */}
      <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-green-100">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <div className="bg-green-100 p-3 rounded-xl">
              <Target size={28} className="text-green-600" />
            </div>
            <span>Your Career Goals</span>
          </h3>
          <button onClick={() => setShowGoalModal(true)} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 transform hover:scale-[1.02]">
            <Plus size={20} />
            Add New Goal
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-12 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
            <div className="text-6xl mb-4">🌱</div>
            <p className="text-gray-600 text-lg mb-2">Your goals will grow here</p>
            <p className="text-gray-500 text-sm">Start by adding your first goal - every journey begins with a single step</p>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map(goal => (
              <div key={goal.id} onClick={() => toggleGoalStatus(goal.id)} className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-2xl flex-wrap gap-4 cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  {goal.status === 'done' && (
                    <div className="bg-green-100 p-3 rounded-xl">
                      <CheckCircle2 className="text-green-600" size={28} />
                    </div>
                  )}
                  {goal.status === 'in-progress' && (
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <TrendingUp className="text-blue-600" size={28} />
                    </div>
                  )}
                  {goal.status === 'not-started' && (
                    <div className="w-12 h-12 border-3 border-gray-300 rounded-xl flex items-center justify-center hover:border-green-400 transition">
                      <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    </div>
                  )}
                  <div>
                    <p className={`font-semibold text-lg ${goal.status === 'done' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                      {goal.title}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <Calendar size={16} />
                      Due: {goal.dueDate}
                    </p>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                  goal.status === 'done' ? 'bg-green-100 text-green-700' :
                  goal.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {goal.status === 'done' ? '✓ Completed' : 
                   goal.status === 'in-progress' ? '→ In Progress' : '○ Not Started'}
                </span>
              </div>
            ))}
            <p className="text-center text-sm text-gray-500 mt-6 italic bg-blue-50 py-3 rounded-xl">
              💡 Tip: Click on any goal to update its status
            </p>
          </div>
        )}
      </div>

      {/* Session History */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-xl">
            <MessageSquare size={28} className="text-blue-600" />
          </div>
          <span>Session History</span>
        </h3>
        <div className="space-y-6">
          {menteeData.sessions.map((session, idx) => (
            <div key={idx} className="border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50 to-white rounded-r-2xl hover:shadow-md transition">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <Calendar size={18} />
                <span className="font-medium">{session.date}</span>
                <span>•</span>
                <span>with {menteeData.mentor}</span>
              </div>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold text-gray-800">Topic:</span> {session.prepNotes}
              </p>
              <div className="bg-white p-4 rounded-xl border border-blue-100">
                <p className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <span>💡</span>
                  <span>Key Takeaways:</span>
                </p>
                <ul className="space-y-2">
                  {session.takeaways.map((item, i) => (
                    <li key={i} className="text-gray-600 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Modals remain the same */}
    {showGoalModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Create New Goal</h3>
            <button onClick={() => setShowGoalModal(false)} className="text-gray-400 hover:text-gray-600 transition">
              <X size={28} />
            </button>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Goal Title</label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-green-400 focus:ring-4 focus:ring-green-100 focus:outline-none transition"
                placeholder="e.g., Learn React basics"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Due Date</label>
              <input
                type="date"
                value={newGoal.dueDate}
                onChange={(e) => setNewGoal({...newGoal, dueDate: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-green-400 focus:ring-4 focus:ring-green-100 focus:outline-none transition"
              />
            </div>
          </div>
          <button onClick={addGoal} className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-semibold transition shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
            Create Goal 🎯
          </button>
        </div>
      </div>
    )}

    {showReflectionModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Weekly Check-In</h3>
            <button onClick={() => setShowReflectionModal(false)} className="text-gray-400 hover:text-gray-600 transition">
              <X size={28} />
            </button>
          </div>
          <p className="text-gray-600 mb-6">Let's celebrate your progress this week 🌟</p>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-3">What's one win this week?</label>
              <textarea
                value={newReflection.win}
                onChange={(e) => setNewReflection({...newReflection, win: e.target.value})}
                className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 focus:outline-none resize-none transition"
                rows="4"
                placeholder="Even small wins count... share what made you proud"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-3">How supported do you feel? (1-5)</label>
              <div className="flex justify-between gap-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => setNewReflection({...newReflection, support: level})}
                    className={`w-14 h-14 rounded-xl font-bold text-lg transition-all duration-300 ${
                      newReflection.support === level
                        ? 'bg-gradient-to-br from-pink-500 to-rose-500 text-white scale-110 shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>
          <button onClick={addReflection} className="w-full mt-6 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:via-rose-600 hover:to-purple-600 text-white py-4 rounded-xl font-semibold transition shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
            Submit Check-In 💖
          </button>
        </div>
      </div>
    )}
  </div>
);
const MentorDashboard = () => (
  <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
    <nav className="bg-white/80 backdrop-blur-lg border-b border-green-100 px-8 py-4 flex justify-between items-center shadow-sm">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Mentor Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Thank you for lighting the way for others 🌟</p>
      </div>
      <button onClick={() => setCurrentView('landing')} className="text-green-600 hover:text-green-800 transition flex items-center gap-1">
        ← Back to Home
      </button>
    </nav>

    <div className="max-w-6xl mx-auto p-8">
      {/* Mentor Profile Card */}
      <div className="bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 text-white rounded-3xl p-8 mb-8 shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
            <Users size={40} />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-2">{mentorData.name}</h2>
            <p className="text-green-100 text-lg">Mentoring {mentorData.mentees.length} professionals on their journey</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
          {mentorData.expertise.map((exp, i) => (
            <span key={i} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white/30 transition">
              <Tag size={16} />
              {exp}
            </span>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-green-100 italic text-sm">
            💚 "Your guidance is changing lives. Every conversation plants seeds of possibility."
          </p>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-semibold">Total Mentees</span>
            <div className="bg-green-100 p-3 rounded-xl">
              <Users size={24} className="text-green-600" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800">{mentorData.mentees.length}</p>
          <p className="text-sm text-green-600 mt-2 font-medium">🌱 Lives you're impacting</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-semibold">Active Journeys</span>
            <div className="bg-blue-100 p-3 rounded-xl">
              <TrendingUp size={24} className="text-blue-600" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800">
            {mentorData.mentees.filter(m => m.status === 'active').length}
          </p>
          <p className="text-sm text-blue-600 mt-2 font-medium">✨ Making progress</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700 font-semibold">Needs Attention</span>
            <div className="bg-orange-100 p-3 rounded-xl">
              <AlertCircle size={24} className="text-orange-600" />
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800">
            {mentorData.mentees.filter(m => m.status === 'needs-attention').length}
          </p>
          <p className="text-sm text-orange-600 mt-2 font-medium">🤝 Could use extra support</p>
        </div>
      </div>

      {/* Mentees Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
          <span className="text-3xl">👥</span>
          <span>Your Mentees</span>
        </h3>
        <p className="text-gray-600 ml-11">Each person here is on their own unique journey. Your presence matters.</p>
      </div>

      <div className="grid gap-6">
        {mentorData.mentees.map((mentee, idx) => (
          <div key={idx} className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
            mentee.status === 'needs-attention' 
              ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-white' 
              : 'border-green-100 hover:border-green-200'
          }`}>
            {/* Header */}
            <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${
                  mentee.status === 'needs-attention' ? 'bg-orange-100' : 'bg-green-100'
                }`}>
                  <User size={28} className={
                    mentee.status === 'needs-attention' ? 'text-orange-600' : 'text-green-600'
                  } />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800 flex items-center gap-3 flex-wrap">
                    <span>{mentee.name}</span>
                    {mentee.status === 'needs-attention' && (
                      <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                        <AlertCircle size={14} />
                        Needs Check-in
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-600 mt-2 flex items-center gap-2">
                    <Target size={16} />
                    <span>{mentee.goal}</span>
                  </p>
                </div>
              </div>
              <div className="text-right bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Next Session</p>
                <p className="font-bold text-gray-800 flex items-center gap-2 justify-end text-lg">
                  <Calendar size={20} className="text-blue-600" />
                  {mentee.nextSession}
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2 font-medium">Goals Progress</p>
                <div className="flex items-center gap-3">
                  <p className="text-2xl font-bold text-gray-800">{mentee.goalsCompleted}/{mentee.goalsTotal}</p>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500" style={{width: `${(mentee.goalsCompleted / mentee.goalsTotal) * 100}%`}}></div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-green-600 mt-2">
                  {mentee.goalsCompleted === mentee.goalsTotal ? '🎉 All goals completed!' :
                   mentee.goalsCompleted > 0 ? '🌱 Growing steadily' : '🌟 Just getting started'}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2 font-medium">Last Session</p>
                <p className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Clock size={20} />
                  {mentee.lastSession}
                </p>
                <p className="text-xs text-blue-600 mt-2">
                  {mentee.status === 'needs-attention' ? '⚠️ Been a while' : '✓ Recent connection'}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <button 
                  onClick={() => {
                    setSelectedMentee(mentee.name);
                    setShowMenteeDetailModal(true);
                  }}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <MessageSquare size={18} />
                  View Full Journey
                </button>
              </div>
            </div>

            {/* Quick Insight */}
            {mentee.status === 'needs-attention' && (
              <div className="mt-4 pt-4 border-t border-orange-200 bg-orange-50 -mx-6 -mb-6 px-6 py-4 rounded-b-2xl">
                <p className="text-sm text-orange-800 flex items-start gap-2">
                  <span className="text-lg">💭</span>
                  <span>
                    <span className="font-semibold">Gentle reminder:</span> It's been {mentee.lastActivity} since their last activity. A simple check-in might brighten their day.
                  </span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Encouragement Footer */}
      <div className="mt-8 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 rounded-2xl p-6 text-center border border-green-200">
        <p className="text-gray-700 text-lg font-medium mb-2">
          🌟 Remember: You're not just teaching skills - you're opening doors to possibilities
        </p>
        <p className="text-gray-600 text-sm italic">
          Every conversation you have plants seeds that may bloom in ways you'll never see. Thank you for being here.
        </p>
      </div>
    </div>

    {/* Mentee Detail Modal - Enhanced */}
    {showMenteeDetailModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-3xl p-8 max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4 border-b z-10">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-xl">
                  <User size={32} className="text-green-600" />
                </div>
                <span>{selectedMentee}'s Journey</span>
              </h3>
              <p className="text-gray-600 ml-14 mt-1">Understanding their complete story</p>
            </div>
            <button onClick={() => setShowMenteeDetailModal(false)} className="text-gray-400 hover:text-gray-600 transition">
              <X size={28} />
            </button>
          </div>

          {/* Onboarding Intent */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <Lightbulb className="text-blue-600" size={24} />
              </div>
              <span>Initial Intent & Needs</span>
            </h4>
            <div className="space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span>💭</span>
                  <span>What gap have they been navigating alone?</span>
                </p>
                <p className="text-gray-800 pl-6">{onboardingData.gap || "Not yet completed"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span>🌟</span>
                  <span>What would make mentorship valuable?</span>
                </p>
                <p className="text-gray-800 pl-6">{onboardingData.value || "Not yet completed"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <span>🤗</span>
                  <span>Support level when they started:</span>
                </p>
                <div className="flex gap-2 mt-2 pl-6">
                  {[1,2,3,4,5].map(level => (
                    <div key={level} className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                      level <= (onboardingData.support || 0) ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {level}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Journey Story */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <div className="bg-pink-100 p-2 rounded-xl">
                <Heart className="text-pink-600" size={24} />
              </div>
              <span>Their Journey Story</span>
            </h4>
            <div className="space-y-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Moment that shaped their path:</p>
                <p className="text-gray-800 italic pl-4 border-l-4 border-pink-300">"{storyData.moment || "Not yet shared"}"</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Still figuring out:</p>
                <p className="text-gray-800 italic pl-4 border-l-4 border-pink-300">"{storyData.figuring || "Not yet shared"}"</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Type of support needed:</p>
                <p className="text-gray-800 italic pl-4 border-l-4 border-pink-300">"{storyData.supportType || "Not yet shared"}"</p>
              </div>
            </div>
          </div>

          {/* Current Goals */}
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <Target className="text-green-600" size={24} />
              </div>
              <span>Current Goals ({goals.filter(g => g.status === 'done').length}/{goals.length} completed)</span>
            </h4>
            <div className="space-y-3">
              {goals.map(goal => (
                <div key={goal.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition">
                  {goal.status === 'done' && <CheckCircle2 className="text-green-600" size={24} />}
                  {goal.status === 'in-progress' && <TrendingUp className="text-blue-600" size={24} />}
                  {goal.status === 'not-started' && <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>}
                  <div className="flex-1">
                    <p className={`font-medium ${goal.status === 'done' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                      {goal.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Due: {goal.dueDate}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    goal.status === 'done' ? 'bg-green-100 text-green-700' :
                    goal.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {goal.status === 'done' ? 'Done' : 
                     goal.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reflections */}
          {reflections.length > 0 && (
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-xl">
                  <Heart className="text-purple-600" size={24} />
                </div>
                <span>Recent Reflections</span>
              </h4>
              <div className="space-y-4">
                {reflections.slice(0, 3).map((reflection, idx) => (
                  <div key={idx} className="border-l-4 border-purple-500 pl-6 py-4 bg-gradient-to-r from-purple-50 to-white rounded-r-2xl">
                    <p className="text-xs text-gray-500 mb-2 font-medium">{reflection.week}</p>
                    <p className="text-gray-800 font-semibold mb-3">"{reflection.win}"</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Support level:</span>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(level => (
                          <div key={level} className={`w-6 h-6 rounded-full ${level <= reflection.support ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gray-200'}`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);
  const CoordinatorDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{coordinatorData.programName}</h1>
          <p className="text-gray-600">Coordinator: {coordinatorData.name}</p>
        </div>
        <button onClick={() => setCurrentView('landing')} className="text-blue-600 hover:text-blue-800">← Back</button>
      </nav>
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-8 text-center">
          <p className="text-purple-800 italic">💜 Remember: You've already changed lives. This just helps you see it.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-gray-600 mb-2">Total Pairs</p>
            <p className="text-4xl font-bold text-gray-800">{coordinatorData.totalPairs}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-gray-600 mb-2">Active</p>
            <p className="text-4xl font-bold text-green-600">{coordinatorData.activePairs}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-gray-600 mb-2">Needs Attention</p>
            <p className="text-4xl font-bold text-orange-600">{coordinatorData.needsAttention}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex items-center justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">Export CSV</button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">All Mentorship Pairs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mentee</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mentor</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Field/Tag</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sessions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {coordinatorData.pairs.map((pair, idx) => (
                  <tr key={idx} className={pair.status === 'needs-attention' ? 'bg-orange-50' : ''}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{pair.mentee}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{pair.mentor}</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1"><Tag size={12} />{pair.field}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${pair.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                        {pair.status === 'active' ? '🟢 Active' : '🟡 Needs Check-in'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{pair.lastActivity}</td>
                    <td className="px-6 py-4 text-sm text-gray-800 font-semibold">{pair.sessionCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'onboarding' && <OnboardingPage />}
      {currentView === 'story' && <StoryModulePage />}
      {currentView === 'mentee' && <MenteeDashboard />}
      {currentView === 'mentor' && <MentorDashboard />}
      {currentView === 'coordinator' && <CoordinatorDashboard />}
    </div>
  );
};

export default App;