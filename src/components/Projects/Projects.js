import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
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
              ghLink="https://www.oneclicksat.fyi/"
              demoLink="https://youtu.be/Z7aB6NjN95s"
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
              ghLink={null}
              demoLink="https://www.youtube.com/watch?v=DGQTm1KxFyc"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Protestor Friendly Live Feed"
              description={`Designed a face blurring algorithm with a Generative Adversarial Network, protecting protesters' anonymity in news media protest footage.\n(Feb 2022 - Aug 2022)`}
              ghLink="https://devpost.com/software/protestor-friendly-live-feed"
              demoLink={null}
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={true}
              title="Final Design Portfolio"
              description="A detailed write-up on my final design portfolio, covering process, outcomes, and learnings."
              ghLink={null}
              demoLink="https://medium.com/@ajvkrish/final-design-portfolio-13f5624c036b"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
