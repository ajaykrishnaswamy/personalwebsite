import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <>
      <Container fluid className="project-section">
        <Particle />
        <Container>
          <h1 className="project-heading">
            My Recent <strong className="purple">Works </strong>
          </h1>
          <p style={{ color: "white" }}>
            Here are a few projects I've worked on recently.
          </p>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={bitsOfCode}
                isBlog={false}
                title="Puter"
                description={`Successfully merged an open source contribution to Puter, an Internet OS with over 30,000 stars on GitHub.\nCreated a JavaScript automation script that generates descriptions for 100+ events called in the Puter codebase.\nAuto-scans a manual overrides file to override incorrect descriptions and updates the events documentation accordingly.\nSaved 100+ hours of documentation time for Puter developers, and potentially 1000+ hours for future Puter contributors.\n(Mar 2025 - Mar 2025)`}
                ghLink="https://github.com/HeyPuter/puter/pull/1164"
                demoLink="https://www.youtube.com/watch?v=E0WL8MbU8JA"
              />
            </Col>
            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={bitsOfCode}
                isBlog={false}
                title="One Click SAT"
                description={`Designed a platform for educators to create and deploy practice SAT diagnostic tests to students using generative AI.\nBuilt using Next.js and Supabase, deployed with Vercel, and the product is currently being used by a tutoring center in Atlanta.\nAccepted into the CREATE-X Startup Accelerator with $5000 funding, and won 8th place in the Headstarter Buildathon.\n(Jan 2025 - Mar 2025)`}
                ghLink="https://github.com/ajaykrishnaswamy/oneclicksatai"
                demoLink="https://youtu.be/Z7aB6NjN95s"
                websiteLink="https://www.oneclicksat.fyi/"
              />
            </Col>
            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={bitsOfCode}
                isBlog={false}
                title="LLM Evaluation"
                description={`Created a platform using Next, Groq, Supabase that evaluated responses from LLMs using another LLM as a grading tool.\nDeveloped an interface where users could input their custom questions for the LLM and experiment with different prompts.\n(Jan 2025 - Feb 2025)`}
                ghLink="https://github.com/ajaykrishnaswamy/llmeval02"
                demoLink={null}
              />
            </Col>
            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={bitsOfCode}
                isBlog={false}
                title="Market Anomaly Detection"
                description={`Trained a model using LSTM and Isolation Forest to predict anomalies in the stock market.\nUsed a correlation matrix to narrow down the useful features and received a precision of 85% on data from 2000 - 2020.\n(Jan 2025 - Feb 2025)`}
                ghLink="https://github.com/ajaykrishnaswamy/marketanomalydetector"
                demoLink="https://www.youtube.com/watch?v=DGQTm1KxFyc"
              />
            </Col>
            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={bitsOfCode}
                isBlog={false}
                title="Protestor Friendly Live Feed"
                description={`Designed a face blurring algorithm with a Generative Adversarial Network, protecting protesters' anonymity in news media protest footage.\n(Feb 2022 - Aug 2022)`}
                ghLink="https://github.com/AndyYu25/Hacklytics-2022-ArtificiallyIntelligent"
                websiteLink="https://devpost.com/software/protestor-friendly-live-feed"
                demoLink="https://www.youtube.com/watch?v=ZqJzCrjDCbI"
              />
            </Col>
          </Row>
        </Container>
      </Container>
      {/* Blog Section for Leetcode Redesign */}
      <Container fluid className="project-section">
        <Container>
          <h1 className="project-heading">
            <strong className="purple">Leetcode Redesign</strong> Blog
          </h1>
          <div style={{ color: "white", background: "#2d1950", borderRadius: "10px", padding: "2rem", marginBottom: "2rem" }}>
            <p>
              In this exercise, we redesigned the Leetcode App to include 5 features. To start off the process, we narrowed our ideas down, figured out what app we were going to redesign, and conducted user tests for each app. Once we decided on leetcode, we created a clickable prototype and finally created a Figma prototype. The feature I implemented was the debugger feature. Overall, I learned a lot from this exercise, including how to conduct user tests and how to incorporate ed-tech design principles.
            </p>
            <h4>Persona</h4>
            <blockquote style={{ borderLeft: "4px solid #c770f0", paddingLeft: "1rem", fontStyle: "italic" }}>
              "Riya Jacob is a 20 year old college student who is currently in her junior year at Georgia Tech. She is a computer science major passionate about building computer vision projects and loves to take part in clubs that provide her resources with early career knowledge. As a junior CS major, she is focused on bettering her coding skills and cracking technical interviews for a summer internship. She is motivated to find methods to track her ongoing progress and find the best study routines to learn materials efficiently. She is also actively looking for a community of peers who she can discuss problems with and help her with her projects. The main challenges she faces in these pursuits is the overwhelming amount of coding problems and lack of structure in the learning materials. She also finds the current UI/UX of some of the learning apps to be not engaging and actually deter her learning and the lack of community help and resources in these apps make her more annoyed at the current state of education apps. An application with progress tracking, peer discussion and modern UI/UX interface that engages the learner would solve most of Riya's problems and she can stay motivated and continue on working on her coding skills and be a better developer, stress and annoyance free."
            </blockquote>
            <h4>User Testing Videos</h4>
            <div>
              <p>Interview for Leetcode: <a href="https://www.youtube.com/watch?v=3Yz_X5OOsqs&ab_channel=AjayKrishnaswamy" target="_blank" rel="noopener noreferrer">YouTube</a></p>
              <p>Interview for Canvas: <a href="https://www.youtube.com/watch?v=YZDjOOiXlmI&ab_channel=AjayKrishnaswamy" target="_blank" rel="noopener noreferrer">YouTube</a></p>
            </div>
            <h4>Storyboard</h4>
            <p>After our usability tests, we created several storyboards that reflected our ideas for new features in the Leetcode app. Here is my storyboard:</p>
            <p><em>(Storyboard image or description can be added here if available)</em></p>
            <h4>Clickable Prototype</h4>
            <p>After this, we created a clickable prototype.</p>
            <p><em>(Clickable Protoypes.pptx can be linked or described here if available)</em></p>
            <h4>Usability Testing Feedback</h4>
            <div>
              <p><strong>User 1:</strong></p>
              <p>He really liked how the functionality would help him debug his code.</p>
              <p>He elaborated on how the debugging function would limit him having to print out his variable outputs every time.</p>
              <p>One suggestion he had was to allow users to see the expected output during debugging</p>
              <p>Another suggestion he had was that he felt that the call stack was unnecessary.</p>
              <p><strong>User 2:</strong></p>
              <p>One thing he liked was the fact that he could debug while coding, instead of the debug menu popping up after he ran the code for the first time.</p>
              <p>He also really liked the design of the debug menu, and how it looked next to the leetcode menu.</p>
              <p>One suggestion was to allow users to see breakpoints in the code.</p>
              <p>Another suggestion was to allow the user to use up and down arrows to change the breakpoints.</p>
            </div>
            <h4>Potential Improvements</h4>
            <div>
              <p>Add an "expected output" box that will allow users to see what the output should be.</p>
              <p>Add a breakpoints option to allow the user to assign breakpoints.</p>
              <p>Allow the user to toggle their breakpoints using their arrow keys</p>
              <p>Delete the call stack in the debug menu.</p>
              <p>Enable the user to select between test cases so that it works well.</p>
            </div>
            <h4>Revised Clickable Prototype</h4>
            <p>After I corroborated all of my user feedback, I revised my clickable prototype design (attached above). After this step, I created my final prototype with Figma! Below you will find my Figma prototype, as well as insights from design principles!</p>
            <h4>Final Prototype Link</h4>
            <a href="https://www.figma.com/proto/nSVjWjnr2xoJyMKzIeH6zi/Untitled?node-id=0-1&t=EuwJmvyzbcvbYnVQ-1&scaling=scale-down" target="_blank" rel="noopener noreferrer">Figma Prototype</a>
            <h4>Insights from the UI Design Principles</h4>
            <p>I refined the Debugger Tool according to the principles of consistency and standards, by opting for a yellow box around the breakpoint code. This ensures that the developers would be able to consistently see where they are making the changes and where they are adding the breakpoints. Another thing that I used was the visibility of the system status, by putting big blue buttons at the bottom of the page to indicate where to click for the debug page. This ensured that the button was visible whenever the user wanted to access the feature. Lastly, I ensured that the design was minimalist, because I didn't want the user to be overloaded with features. Because of this, I added only 3 buttons and two textboxes which highlighted the breakpoints.</p>
            <h4>Previous User Test Feedback Implementation in Figma 1</h4>
            <p>One of the problems with the Debugger tool was that there was no breakpoint indicator displayed on each line that the breakpoint was created. So because of this, in my last figma design, I added breakpoints that showed that there was a change in a particular line or that a particular line was breakpointed. This showed that there was no ambiguity in where the breakpoints were added and where they needed to be added if the user wanted to see where they could add additional breakpoints. Also, initially, the buttons were small and inaccessible, and so we made them bigger to follow user feedback. Once we made the debug buttons bigger, the users were better able to see the buttons and use the feature without us having to explain the usage to them.</p>
            <h4>Final User Testing Video</h4>
            <a href="https://drive.google.com/file/d/1fbexAtJt3NyGll_Pw2XqEtS1qjcvkOEo/view?usp=sharing" target="_blank" rel="noopener noreferrer">Google Drive: User Testing Video</a>
            <h4>Reflection</h4>
            <p>Looking back on this whole assignment, my process of moving from low-fi prototypes to more hi-fi detailed ones was really tough but definitely rewarding. At the beginning, we worked on coming up with ideas and creating simple wireframes. This helped us clarify my main ideas and get some early feedback on the layout and features. As we reached the middle stage of my project, we started improving how different features work using usability rules and feedback from user tests. This step was very important in deciding how the different features would help and assist users. This approach was meant to closely align with what we learned about learning and knowledge from lectures and readings, which definitely helped us understand better what users wanted.</p>
            <p>By the time we got to the high fidelity stage, my prototype was much more complete and well made. The changes we made, for example in the AI Chatbot like adding helpful tips when starting, making the close button easier to see, improving the look, and creating a better chat experience, were all based on testing and feedback we gathered from talking to users. Similarly, for Brainstorm Mode, we refined the live collaboration experience by adding a clear waiting screen, a back button for user control, and visual cues like a shared pointer and chat bubbles to help users feel truly engaged in real time problem solving. We also improved the Real-World Problems feature by incorporating contextual scenarios that connect coding tasks to software engineering applications, helping users understand the purpose behind each problem. The Debugger Tool was built to encourage productive failure and reflection by letting users see variable values and step through their logic, making bugs more approachable. Finally, the Courses feature brought all these ideas together by organizing problems in a structured, skill building path to help users progress from basic to complex topics in a logical, scaffolded way. The way the assignment was organized, with each step adding to the last one, really helped us understand how user centered design develops. However, the speed felt a little too fast at times, especially when going from mid quality to high quality versions while also testing with users, making changes based on their feedback, and improving the visuals. Having more time between each stage would have helped us explore further, try different designs, and test more thoroughly. Even though we were short on time, the process of making changes directly from my lecture knowledge and user tests, helped us all get a better idea of the real world project development experience. The assignments definitely helped us gain important real world experience in turning ideas and feedback into practical, research supported, and easy to use designs.</p>
            <h4>Read the Full Blog</h4>
            <a href="https://medium.com/@ajvkrish/final-design-portfolio-13f5624c036b" target="_blank" rel="noopener noreferrer">Medium Blog Post</a>
          </div>
        </Container>
      </Container>
    </>
  );
}

export default Projects;
