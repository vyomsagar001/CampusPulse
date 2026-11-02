
require("dotenv").config();

const mongoose = require("mongoose");
const Club = require("./models/Club");
const Event = require("./models/Event");
const User = require("./models/User");

const DEMO_NOTE =
  "DEMO DATA: This is an illustrative CampusPulse sample event, not a confirmed official MUJ announcement. ";

function daysFromNow(days, hour = 10) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(hour, 0, 0, 0);
  return date;
}

const clubData = [
  {
    name: "AIML Community",
    description:
      "A student community focused on artificial intelligence, machine learning, data science, and emerging technologies.",
    category: "Technical",
  },
  {
    name: "ACM",
    description:
      "A computing community promoting programming, technical learning, coding competitions, and collaborative development.",
    category: "Technical",
  },
  {
    name: "IEEE",
    description:
      "A technology-oriented student community encouraging innovation, engineering knowledge, research, and technical collaboration.",
    category: "Technical",
  },
  {
    name: "Nexus",
    description:
      "A student community bringing together learners through collaborative activities, technology, and campus engagement.",
    category: "Technical",
  },
  {
    name: "DOAR",
    description:
      "A sample university engagement community focused on alumni interactions, networking, and career connections.",
    category: "University Engagement",
  },
  {
    name: "Sports Council",
    description:
      "A sample sports community encouraging athletic participation, tournaments, fitness, and teamwork.",
    category: "Sports",
  },
  {
    name: "Rotaract Club",
    description:
      "A student community focused on social responsibility, volunteering, leadership, and community service.",
    category: "Social Service",
  },
  {
    name: "Entrepreneurship Cell",
    description:
      "A student community encouraging entrepreneurship, startup culture, business ideas, and innovation.",
    category: "Entrepreneurship",
  },
  {
    name: "Photography Club",
    description:
      "A creative community for photography enthusiasts interested in visual storytelling and campus photography.",
    category: "Cultural",
  },
  {
    name: "Music and Dance Club",
    description:
      "A creative community celebrating music, dance, performances, and cultural expression.",
    category: "Cultural",
  },
];

const eventData = [
  // SPORTS - 5
  {
    title: "Campus Cricket Championship",
    club: "Sports Council",
    category: "SPORTS",
    description: "Inter-team cricket tournament for campus students.",
    venue: "University Cricket Ground",
    days: 7,
    capacity: 120,
  },
  {
    title: "Football League",
    club: "Sports Council",
    category: "SPORTS",
    description: "A campus football competition featuring student teams.",
    venue: "University Football Ground",
    days: 12,
    capacity: 100,
  },
  {
    title: "Basketball Showdown",
    club: "Sports Council",
    category: "SPORTS",
    description: "A friendly inter-team basketball championship.",
    venue: "Indoor Basketball Court",
    days: 17,
    capacity: 80,
  },
  {
    title: "Badminton Open",
    club: "Sports Council",
    category: "SPORTS",
    description: "A singles and doubles badminton competition.",
    venue: "Indoor Sports Complex",
    days: 22,
    capacity: 64,
  },
  {
    title: "Campus Sports Fest",
    club: "Sports Council",
    category: "SPORTS",
    description: "A multi-sport celebration featuring several athletic activities.",
    venue: "University Sports Complex",
    days: 30,
    capacity: 250,
  },

  // TECHNICAL - 5
  {
    title: "Campus Kagglethon",
    club: "AIML Community",
    category: "TECHNICAL",
    description: "A data science competition involving exploratory analysis and predictive modelling.",
    venue: "AB2 Computer Lab",
    days: 9,
    capacity: 100,
  },
  {
    title: "AI and ML Innovation Hackathon",
    club: "AIML Community",
    category: "HACKATHON",
    description: "A team-based hackathon to develop practical AI and machine learning solutions.",
    venue: "Innovation Lab",
    days: 19,
    capacity: 150,
  },
  {
    title: "Competitive Coding Challenge",
    club: "ACM",
    category: "TECHNICAL",
    description: "A programming contest testing problem-solving and algorithmic skills.",
    venue: "AB1 Computer Lab",
    days: 25,
    capacity: 100,
  },
  {
    title: "Cybersecurity CTF",
    club: "IEEE",
    category: "TECHNICAL",
    description: "A beginner-friendly cybersecurity capture-the-flag challenge.",
    venue: "AB2 Seminar Hall",
    days: 34,
    capacity: 90,
  },
  {
    title: "MujHacks Innovation Sprint",
    club: "ACM",
    category: "HACKATHON",
    description: "A collaborative hackathon focused on building technology prototypes.",
    venue: "University Innovation Centre",
    days: 42,
    capacity: 180,
  },

  // ACADEMIC - 4
  {
    title: "Research Paper Writing Seminar",
    club: "IEEE",
    category: "ACADEMIC",
    description: "An introductory seminar on research methodology and academic writing.",
    venue: "AB2 Seminar Hall",
    days: 14,
    capacity: 100,
  },
  {
    title: "Industry Expert Guest Lecture",
    club: "Nexus",
    category: "ACADEMIC",
    description: "An illustrative guest lecture on industry trends and emerging technologies.",
    venue: "University Auditorium",
    days: 28,
    capacity: 200,
  },
  {
    title: "Student Research Symposium",
    club: "IEEE",
    category: "ACADEMIC",
    description: "A platform for students to present research ideas and project findings.",
    venue: "AB3 Conference Hall",
    days: 38,
    capacity: 120,
  },
  {
    title: "Career Guidance and Roadmap Session",
    club: "DOAR",
    category: "WORKSHOP",
    description: "A sample career guidance session covering professional development and career planning.",
    venue: "University Auditorium",
    days: 48,
    capacity: 150,
  },

  // UNIVERSITY ENGAGEMENT - 3
  {
    title: "Tea with the President",
    club: "DOAR",
    category: "OTHER",
    description: "An illustrative interactive student and university leadership discussion.",
    venue: "University Conference Room",
    days: 16,
    capacity: 50,
  },
  {
    title: "Meet the Dean",
    club: "DOAR",
    category: "OTHER",
    description: "An interactive session for students to discuss academic experiences and ideas.",
    venue: "AB1 Seminar Hall",
    days: 32,
    capacity: 80,
  },
  {
    title: "Student Town Hall",
    club: "Nexus",
    category: "OTHER",
    description: "A sample campus discussion encouraging student participation and feedback.",
    venue: "University Auditorium",
    days: 52,
    capacity: 200,
  },

  // CULTURAL - 4
  {
    title: "Campus Open Mic Night",
    club: "Music and Dance Club",
    category: "CULTURAL",
    description: "An evening of music, poetry, storytelling, and student performances.",
    venue: "Open Air Theatre",
    days: 11,
    capacity: 120,
  },
  {
    title: "Photography Walk",
    club: "Photography Club",
    category: "CULTURAL",
    description: "A creative photography walk exploring campus through visual storytelling.",
    venue: "University Campus",
    days: 24,
    capacity: 60,
  },
  {
    title: "Inter-College Dance Competition",
    club: "Music and Dance Club",
    category: "CULTURAL",
    description: "A dance competition showcasing different styles and performances.",
    venue: "University Auditorium",
    days: 40,
    capacity: 150,
  },
  {
    title: "Campus Music Festival",
    club: "Music and Dance Club",
    category: "CULTURAL",
    description: "A sample musical celebration featuring student performances.",
    venue: "Open Air Theatre",
    days: 58,
    capacity: 250,
  },
];

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from backend .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Atlas");

    const user = await User.findOne().sort({ createdAt: 1 });

    if (!user) {
      throw new Error(
        "No existing user found. Sign in to CampusPulse before running the seed script."
      );
    }

    console.log(`Using existing user: ${user.email}`);

    const clubMap = {};

    for (const data of clubData) {
      let club = await Club.findOne({ name: data.name });

      if (!club) {
        club = await Club.create({
          ...data,
          createdBy: user._id,
          admins: [user._id],
          status: "ACTIVE",
          contactEmail: user.email,
        });

        console.log(`Created club: ${club.name}`);
      } else {
        console.log(`Reusing existing club: ${club.name}`);
      }

      clubMap[data.name] = club;
    }

    let created = 0;
    let updated = 0;

    for (const data of eventData) {
      const club = clubMap[data.club];

      if (!club) {
        throw new Error(`Club not found for event: ${data.title}`);
      }

      const startDate = daysFromNow(data.days);
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + 3);

      const registrationDeadline = daysFromNow(data.days - 2, 23);

      const event = await Event.findOneAndUpdate(
        {
          title: data.title,
          club: club._id,
        },
        {
          $set: {
            title: data.title,
            description: DEMO_NOTE + data.description,
            club: club._id,
            category: data.category,
            venue: data.venue,
            startDate,
            endDate,
            registrationDeadline,
            capacity: data.capacity,
            status: "PUBLISHED",
            createdBy: user._id,
          },
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
          setDefaultsOnInsert: true,
          rawResult: true,
        }
      );

      if (event.lastErrorObject?.updatedExisting) {
        updated++;
      } else {
        created++;
      }
    }

    console.log("\nDatabase seeding completed successfully.");
    console.log(`Clubs available: ${await Club.countDocuments()}`);
    console.log(`Events available: ${await Event.countDocuments()}`);
    console.log(`Demo events inserted: ${created}`);
    console.log(`Demo events refreshed: ${updated}`);
    console.log("Existing unrelated records were preserved.");
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
