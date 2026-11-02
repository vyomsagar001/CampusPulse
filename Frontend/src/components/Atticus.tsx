
import { useState } from 'react';
import type { CampusEvent, Club } from '@/types';
import { eventsApi } from '@/api/events';
import { clubsApi } from '@/api/clubs';

type ChatMessage = {
  id: number;
  sender: 'user' | 'bot';
  text: string;
  events?: CampusEvent[];
  clubs?: Club[];
};

const questions = [
  {
    category: 'CAMPUSPULSE',
    items: [
      'What is CampusPulse?',
    ],
  },
  {
    category: 'EVENTS',
    items: [
      'What events are coming up?',
      'How do I register for an event?',
      'Can I cancel my registration?',
      'Where can I see my registrations?',
    ],
  },
  {
    category: 'CLUBS',
    items: [
      'Which clubs are available?',
      'How can I explore a club?',
    ],
  },
];

export function Atticus() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I'm Atticus, your CampusPulse assistant. 👋\n\nSelect one of the questions below and I'll help you find the information you need.",
    },
  ]);

  const addMessage = (message: Omit<ChatMessage, 'id'>) => {
    setMessages((previous) => [
      ...previous,
      { ...message, id: Date.now() + Math.random() },
    ]);
  };

  const handleQuestion = async (question: string) => {
    if (loading) return;

    addMessage({
      sender: 'user',
      text: question,
    });

    setLoading(true);

    try {
      if (question === 'What events are coming up?') {
        const events = await eventsApi.getAll();

        const now = new Date();

        const upcomingEvents = events
          .filter((event) => {
            const startDate = new Date(event.startDate);

            return (
              ['PUBLISHED', 'ONGOING'].includes(event.status) &&
              !Number.isNaN(startDate.getTime()) &&
              startDate >= now
            );
          })
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() -
              new Date(b.startDate).getTime()
          )
          .slice(0, 5);

        addMessage({
          sender: 'bot',
          text: upcomingEvents.length
            ? 'Here are some upcoming events on CampusPulse:'
            : 'There are currently no upcoming published events available.',
          events: upcomingEvents,
        });
      } else if (
        question === 'Which clubs are available?' ||
        question === 'How can I explore a club?'
      ) {
        const clubs = await clubsApi.getAll();

        const activeClubs = clubs
          .filter((club) => club.status === 'ACTIVE')
          .slice(0, 8);

        addMessage({
          sender: 'bot',
          text: activeClubs.length
            ? 'Here are the active clubs available on CampusPulse:'
            : 'There are currently no active clubs available.',
          clubs: activeClubs,
        });
      } else {
        const answers: Record<string, string> = {
          'What is CampusPulse?':
            'CampusPulse is a centralized campus event and engagement platform. It helps students discover college events, explore clubs, register for activities and stay connected with campus life.',

          'How do I register for an event?':
            'You can register for an event by following these steps:\n\n1. Open the Events section.\n2. Select the event you are interested in.\n3. Open its details page.\n4. Click the Register button.\n\nYour registration will be saved to your account.',

          'Can I cancel my registration?':
            'Yes! Visit My Registrations from your dashboard, select the event and use the cancellation option if available.',

          'Where can I see my registrations?':
            'Log in to CampusPulse and open your Dashboard. You can find your registered events under the My Registrations section.',
        };

        addMessage({
          sender: 'bot',
          text:
            answers[question] ||
            'Please select one of the available questions so I can help you.',
        });
      }
    } catch (error) {
      console.error('Atticus error:', error);

      addMessage({
        sender: 'bot',
        text: 'Sorry! I could not retrieve this information right now. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <>
      {/* Floating Atticus Button */}
      <button
        onClick={() => setIsOpen((previous) => !previous)}
        className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-2xl text-white shadow-xl transition hover:scale-105 hover:bg-indigo-700"
        aria-label="Open Atticus assistant"
      >
        {isOpen ? '×' : '✦'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[100] flex h-[540px] max-h-[75vh] w-[360px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center gap-3 bg-indigo-600 px-4 py-4 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-xl">
              ✦
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">Atticus</h3>
              <p className="text-xs text-indigo-100">
                Your CampusPulse Assistant
              </p>
            </div>

            <span className="flex items-center gap-1 text-xs text-indigo-100">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Online
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>

                  {message.events && (
                    <div className="mt-3 space-y-2">
                      {message.events.map((event) => (
                        <div
                          key={event.id}
                          className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-700"
                        >
                          <p className="font-semibold">{event.title}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {formatDate(event.startDate)}
                          </p>
                          <p className="text-xs text-slate-500">
                            {event.venue}
                          </p>
                          <p className="mt-1 text-xs text-indigo-600">
                            {event.category}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {message.clubs && (
                    <div className="mt-3 space-y-2">
                      {message.clubs.map((club) => (
                        <div
                          key={club.id}
                          className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-700"
                        >
                          <p className="font-semibold">{club.name}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {club.category}
                          </p>
                          <p className="mt-1 text-xs text-slate-600">
                            {club.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-sm text-slate-500">
                Atticus is finding your information...
              </div>
            )}
          </div>

          {/* Predefined Questions */}
          <div className="border-t border-slate-200 bg-white p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Choose a question
            </p>

            <div className="max-h-40 space-y-2 overflow-y-auto">
              {questions.map((group) => (
                <div key={group.category}>
                  <p className="mb-1 text-[10px] font-bold text-indigo-500">
                    {group.category}
                  </p>

                  {group.items.map((question) => (
                    <button
                      key={question}
                      disabled={loading}
                      onClick={() => handleQuestion(question)}
                      className="mb-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-xs text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
