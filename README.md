# Newton Adhikari --- Personal Portfolio

[![Live
Website](https://img.shields.io/badge/Live%20Website-newtonadhikari.cc.cd-00d9ff?style=for-the-badge)](https://newtonadhikari.cc.cd)
[![Portfolio](https://img.shields.io/badge/Portfolio-Personal%20Website-7c3aed?style=for-the-badge)](https://newtonadhikari.cc.cd)

A personal developer and research portfolio showcasing Newton Adhikari's
background, technical skills, academic journey, software projects,
research interests, certifications, and contact information.

**Live website:** https://newtonadhikari.cc.cd/

------------------------------------------------------------------------

## Next-Generation Portfolio Redesign (In Development)

A new version of this portfolio is being developed with a **completely redesigned layout and visual experience**. This is an evolution of the existing portfolio, not a replacement for its professional content.

**Release status:** In development — the redesigned version is **not yet live**. The website link above currently points to the existing published version.

### Redesign Goals

- Establish a fresh visual identity with a new page layout and clearer content hierarchy.
- Improve navigation and discoverability across projects, research, skills, education, and contact information.
- Deliver a consistent experience across mobile, tablet, and desktop screens.
- Prioritize accessibility, readability, performance, and maintainable UI components.
- Preserve and update the portfolio's core content while modernizing how it is presented.

### Planned Content Coverage

The redesign is intended to continue showcasing the same core areas: **Home, About, Skills, Education, Projects, Research, Certifications, and Contact**. Their exact arrangement, interaction patterns, and visual treatment will be documented after the new implementation is finalized.

### Development Checklist

- [ ] Finalize new visual layout and design system
- [ ] Implement responsive page layouts and navigation
- [ ] Migrate and verify existing portfolio content
- [ ] Reconnect and test contact-form submissions and email notifications
- [ ] Test accessibility, responsiveness, and performance
- [ ] Deploy the redesigned version
- [ ] Update this README with verified screenshots, framework details, setup commands, and deployment instructions

> **Documentation note:** The new version's source code and screenshots have not been provided yet. The items above describe redesign objectives and planned work, not verified completed features. The technical details elsewhere in this README describe the currently published portfolio or known contact-form integration unless stated otherwise.

---

## Overview

The portfolio presents Newton as a Computer Science and Engineering
student, full-stack developer, AI enthusiast, and aspiring researcher.
Its visual direction uses a futuristic, AI-inspired interface with a
technology-focused identity.

The website is intended to provide visitors, collaborators, recruiters,
and academic contacts with a single place to explore professional work
and get in touch.

## Website Sections

-   **Home** --- Introductory hero section, short professional
    statement, portfolio statistics, resume link, and social links.
-   **About** --- Personal introduction, career vision, AI interests,
    research interests, and community involvement.
-   **Skills** --- Technical skills and tools across frontend, backend,
    AI/ML, databases, and development infrastructure.
-   **Education** --- Academic history, institutions, qualifications,
    and academic highlights.
-   **Projects** --- Selected software and research-oriented projects
    with descriptions, technology tags, GitHub links, and demo links
    where provided.
-   **Research** --- Published, patent-related, and under-publication
    research work.
-   **Certifications** --- Professional and academic credentials.
-   **Contact** --- Contact form for project inquiries, research
    collaboration, and other messages.

## Featured Projects

The live portfolio currently highlights projects including:

1.  **A Hybrid Reinforcement Learning for End-to-End Supply Chain
    Management** --- A reinforcement-learning-based approach to
    inventory, demand forecasting, production planning, and logistics
    coordination.
2.  **Education Operating System** --- An integrated education platform
    for learning management, academic administration, student
    engagement, and institutional analytics.
3.  **Intelligent GPS Tracking & Fleet Monitoring System** --- A fleet
    platform covering live tracking, route optimization, geofencing,
    travel history, and asset management.
4.  **Enterprise Email Authentication & Identity Verification Platform**
    --- An identity platform featuring email verification, JWT
    authorization, password recovery, OTP validation, and role-based
    access control.
5.  **Smart Event Registration & Attendance Management System** --- A
    registration and attendance workflow with Google Sheets integration.
6.  **Intelligent Voice-Based AI Assistant** --- A conversational
    assistant concept involving voice commands, speech-to-text,
    natural-language processing, and automation.

See the live website for the latest project descriptions, repository
links, and demonstrations.

## Research Highlights

The research section of the portfolio includes:

-   **Performance and Security Analysis of Blockchain-Based
    Decentralized Cloud Storage Systems** --- Listed as published
    research.
-   **A Hybrid Reinforcement Learning Framework for End-to-End Supply
    Chain Management** --- Listed under patent.
-   **Decision-Calibrated Probabilistic Learning for Cost-Sensitive and
    Risk-Aware Decision Making** --- Listed as under publication.

Refer to the portfolio for the current publication and project status.

## Technology

The portfolio's published skills and technology areas include:

  -----------------------------------------------------------------------
  Area                                Technologies listed on the
                                      portfolio
  ----------------------------------- -----------------------------------
  Frontend                            HTML5, CSS3, JavaScript, React,
                                      Next.js, TypeScript

  Backend                             Node.js, Go, Express

  AI / Machine Learning               TensorFlow, PyTorch

  Databases                           MongoDB, PostgreSQL

  DevOps / Tools                      Docker, Git, Linux

  Additional interests                GraphQL, WebSocket, OpenCV, NLP,
                                      BERT, GANs, Blockchain, IPFS, D3.js
  -----------------------------------------------------------------------

> This table reflects technologies presented on the portfolio. It is not
> a claim that every listed technology is a runtime dependency of this
> website.

## Contact Form

The portfolio includes a contact form for visitors to send inquiries.

The contact workflow is designed around a Google Apps Script web app and
Google Sheets:

1.  The visitor completes the contact form.
2.  The website sends the submission to the Apps Script web app.
3.  The backend validates and sanitizes the submitted fields.
4.  The submission is stored in the `Submissions` spreadsheet.
5.  An email notification is sent to the portfolio owner.
6.  A confirmation email is sent to the visitor.
7.  Email attempt statuses are recorded in the spreadsheet.

The Apps Script backend uses server-side validation, a shared request
token, duplicate detection, and per-email rate limiting. Email sending
requires the Apps Script project to be authorized with the appropriate
mail scope.

### Contact backend configuration

The Apps Script configuration includes:

-   Spreadsheet tab: `Submissions`
-   Owner notification address: configured in the Apps Script `CONFIG`
-   Website URL: `https://newtonadhikari.cc.cd`
-   Request token: configured on both the website and Apps Script
    backend

**Security note:** A token embedded in client-side website code is
visible to visitors and should not be treated as a secret or as strong
authentication. Keep privileged credentials on the server, validate all
incoming requests, and apply appropriate abuse protection.

## Next-Generation Portfolio Redesign (In Development)

> **Development status:** A new version of the portfolio with a completely redesigned layout is being developed. The public URL above currently represents the existing version; the redesign is **not yet live**. The details below describe the redesign direction, not verified implemented features.

The next release aims to retain the portfolio's core purpose—showcasing projects, research, skills, education, certifications, and contact information—while introducing a distinct visual layout and a more polished browsing experience. It is an evolution of the existing portfolio rather than a separate project.

### Redesign goals

- Create a fresh page composition and navigation experience rather than simply changing colors or typography.
- Improve the visual hierarchy of the introduction, project showcase, and research highlights.
- Make project details, technologies, demos, and source links easier to discover.
- Provide responsive layouts for mobile, tablet, and desktop screens.
- Improve accessibility, keyboard navigation, contrast, and readable content structure.
- Prioritize performance, maintainability, and search-engine-friendly metadata.
- Preserve the existing contact workflow where it remains compatible with the new implementation.

### Planned content continuity

| Area | Existing portfolio | Redesign intention |
| --- | --- | --- |
| Introduction | Profile and personal overview | Present the same identity in a new layout |
| About and education | Background and academic history | Reorganize for clearer storytelling |
| Skills | Technology listings | Improve grouping and discoverability |
| Projects | Project descriptions and links | Give featured work stronger visual emphasis |
| Research | Research summaries and status | Make contributions easier to explore |
| Certifications | Credentials showcase | Improve browsing and presentation |
| Contact | Contact form and social links | Maintain a straightforward way to connect |

### Release checklist

- [ ] Finalize the redesigned interface and navigation.
- [ ] Confirm the actual framework, dependencies, and repository commands.
- [ ] Connect and validate all portfolio content and links.
- [ ] Test responsive behavior, accessibility, and performance.
- [ ] Test contact form submissions, Google Sheets storage, and email notifications.
- [ ] Add real screenshots or a preview of the redesigned interface.
- [ ] Deploy the new version and update the live link and this README.

**Note:** No new framework, animation library, dashboard, AI integration, or feature is claimed as implemented until it is confirmed in the new source code. Once the redesign is ready, replace this planning section with screenshots, the actual feature list, and verified setup instructions.

---

## Local Development

The public website identifies technologies such as React, Next.js, and
TypeScript, but the live site alone does not expose the repository's
exact package manager, scripts, environment variable names, or directory
structure.

To run the project locally:

1.  Clone the project repository.
2.  Install the dependencies using the package manager specified by the
    repository lockfile.
3.  Configure the environment variables required by the application.
4.  Run the development command defined in `package.json`.
5.  Open the local URL printed by the development server.

For example, if the repository is a Next.js project using npm, the
commands may look like:

``` bash
git clone <your-repository-url>
cd <project-directory>
npm install
npm run dev
```

Use these commands only if they match the actual repository
configuration. Check `package.json` for the authoritative scripts and
dependencies.

## Deployment

The portfolio is publicly available at:

**https://newtonadhikari.cc.cd/**

For future deployments, configure the hosting provider with the
project's actual build command, output settings, and environment
variables. If the contact form uses Google Apps Script, deploy the Apps
Script web app with the intended execution identity and access settings,
authorize its required scopes, and update the website's endpoint
configuration when the deployment URL changes.

## Customization

Portfolio content such as projects, skills, education, research entries,
certifications, and social links should be updated in the source or
content-management workflow used by the repository.

Before publishing changes:

-   Verify all project and social links.
-   Check that resume downloads work.
-   Test the contact form from the deployed website.
-   Confirm that submissions appear in Google Sheets.
-   Verify both owner and visitor email flows.
-   Test the layout on mobile and desktop.
-   Review accessibility, metadata, and page performance.

## Author

**Newton Adhikari**\
Computer Science & Engineering Student · Full-Stack Developer · AI
Enthusiast · Aspiring Researcher

-   Website: https://newtonadhikari.cc.cd/
-   GitHub: https://github.com/
-   LinkedIn: https://www.linkedin.com/

> Replace the generic GitHub and LinkedIn profile URLs above with the
> exact profile URLs from the website before publishing this README.

## License

No repository license was verified from the public website. Add a
`LICENSE` file and update this section if you intend to distribute the
source code under an open-source license.
