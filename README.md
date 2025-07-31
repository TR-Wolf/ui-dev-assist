# UI Development Assistant
### [Live Site](https://ui-dev-assist.netlify.app/)  
### Project for allowing Visa web developers to describe a desired UI and receive a list of suggested UI Components from the Visa Product Design System, and auto-generated code to copy and paste.

## My approach
Prior to beginning this project I first took the time to process the requirements to articulate a list of what I thought to be the hard functional requirements that I needed to implement. 

With these I created a plan for a project timeline with a list of benchmarks that I could use to track my progress and what I should be working on next. 

Alongside this Design, I also created design diagrams for a basic Wireframe and a system design for API calls.

📄 [Google Drive link to view the Design Document.](https://docs.google.com/document/d/1h3D_Cepz6YUj3AmO3ag1Br4r5LABfvJd2FS6zly2y3w/edit?usp=sharing).



##  Technical choices
I built the project using **React**, and hosted it with **Netlify**. After getting familiar with Netlify, I created serverless api's using **Netlify Functions** for proccessing UI requests and retrieving components.

I developed the UI from scratch based on my wireframe. After researching the Visa Product Design System, I followed it's guidance in creating the UI components as well as customizing their look and feel.


## Assumptions or shortcuts I made (AI Usage)
I leveraged **Cursor's IDE tools** to help debug or make minor adjustments to the work that I did. 

I extensively used **ChatGPT** for researching natural language processing and website scraping. I had planned to first scrape all the data I needed, then configure a natural language processor as well as my application based on the format of this data.

The major assumption here is that I would need to create an API or in pre-processing pull component data directly from the Visa Product Design Systems website, as I could not find an API for fetching this data. This proved to take more time than anticipated so I eventually dropped the plan, and hard-coded basic logic instead.


## What I would improve or add with more time:
I found it unsatisfying to drop the goal of creating an API using web scraping and a natural language processor with the data. I would like to have finished this segment so that the site would actually be fully functional as a tool I would want to use as a Visa front end developer.

Given my scoping fault with the forementioned web scraping, I did not have time to pursue the other ancillary bonus goals like saving queries for later or re-use, merging the components into an output UI and displaying a live preview. 

I would have loved to prioritize these features as they would make the project much more useful to developers. However, I chose not to prioritize these as they are essentially useless without complete data.
