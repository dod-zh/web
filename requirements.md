This document describes the requirements for the devopsdays.ch website. The website features an annual community event (DevOpsDays) providing information on program, venue, ticketing, etc.

Non-functional Requirements
- maintainable via code (no web UI / WYSIWYG etc)
- code maintained in git incl. pipelines for automated deployment
- the website is generated as html and can be hosted on a static html server
- changes can be previewed (e.g. in /preview_[pullrequest_id] folder showing the entire website) before publishing it
- templating for repeating elements like an event schedule with sessions, a contact section with team members, or a sponsoring section featuring event sponsors
- the data for repeating elements shall be stored and maintained in human readable files (preferrably json)
- developing and maintaining the website should run in a devcontainer, so that the setup of developers is self-contained and can be done locally or using e.g. codespaces
 
Functional Requirements
- the website shall cover GDPR requirements (cookie constent, etc)
- the website shall work well for SEO optimization and generate content accordingly
- the navigation shall support a multilevel content structure with sub sections
- past event schedules should be browseable 
- sponsors are shown prominently on all pages of the site
- each session (key note, talk, ignite, workshop) has a detail sections featuring the speaker and the session

Website Sitemap
- Home
- Event
    - Tickets
    - Program (when fixed) / Propose (when in rfp mode)
    - Sponsor
    - Location
    - Past Events
- About
    - Conduct
    - Diversity 
    - Sustainability
    - FAQ
    - Contact

Typical program structure
- 2 days event
- single track with exception of workshops and open spaces
- Per day
    - 1 key note
    - 5 talks
    - 8 ignites
    - 3 workshops
    - 6 open spaces (topics only defined at event)

Reference website
- devopsdays.ch