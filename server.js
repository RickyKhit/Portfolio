const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const projects = [
  {
    id: 1,
    title: "Fake News",
    description: "Funny Fake News Website",
    technologies: [".html", ".css"],
    image: "/images/fn.png",
    demoUrl: "https://rickykhit.github.io/NewsWebsite/",
    codeUrl: "https://github.com/RickyKhit/NewsWebsite",
  },
  {
    id: 2,
    title: "Reviews Hub",
    description: "Movie Reviews Website",
    technologies: [".js", ".css", ".json", ".ejs"],
    image: "/images/rh.png",
    demoUrl: "https://reviewshub-6rap.onrender.com",
    codeUrl: "https://github.com/RickyKhit/ReviewsHub",
  },
  {
    id: 3,
    title: "Recipe Page",
    description: "Burmese Chicken And Potato",
    technologies: [".html", ".css"],
    image: "/images/rp.png",
    demoUrl: "https://rickykhit.github.io/Recipe/",
    codeUrl: "https://github.com/RickyKhit/Recipe",
  },
  {
    id: 4,
    title: "Personal Blog",
    description: "Just Random Blog",
    technologies: [".html", ".css"],
    image: "/images/pb.png",
    demoUrl: "https://rickykhit.github.io/personalblog/",
    codeUrl: "https://github.com/RickyKhit/personalblog",
  },
  {
    id: 5,
    title: "Schedule Page",
    description: "A Random Schedule Page ",
    technologies: [".html", ".css"],
    image: "/images/sc.png",
    demoUrl: "https://rickykhit.github.io/schedule-/",
    codeUrl: "https://github.com/RickyKhit/schedule-",
  },
];

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    featuredProjects: projects.slice(0, 2),
  });
});

app.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Projects",
    projects: projects,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
    error: null,
    formData: {
      name: "",
      email: "",
      message: "",
    },
  });
});

app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.render("contact", {
      title: "Contact",
      error: "All fields are required",
      formData: req.body,
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.render("contact", {
      title: "Contact",
      error: "Please enter a valid email address",
      formData: req.body,
    });
  }

  console.log(`New contact: ${name} (${email}) - ${message}`);

  res.render("contact-success", {
    title: "Message Sent",
    name: name,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
