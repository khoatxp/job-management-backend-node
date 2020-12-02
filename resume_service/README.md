# REST API

The REST API to the example app is described below.

Base Url: https://resumeservice-vbryqcvj2a-uw.a.run.app

---
## Parse Resume

### Request

`POST /resume/parse`

### Request
- file(File)

### Response

    Status: 200 OK

    {
        "data": {
            "createdAt": 1606623637740,
            "lastStoryAt": 1606623637740,
            "names": [
            "Jan Ycasas"
            ],
            "emails": [
            {
                "value": "604-773-2356|YCASAS.JAN@GMAIL.COM",
                "canonical": "604-773-2356|ycasas.jan@gmail.com"
            },
            {
                "value": "YCASAS.JAN@GMAIL.COM",
                "canonical": "ycasas.jan@gmail.com"
            }
            ],
            "phones": [
            {
                "value": "604-773-2356",
                "type": "home"
            }
            ],
            "summary": {
            "experience": "JAN YCASAS's experience appears to be strongly concentrated in Information Technology (mostly Cloud Computing) and slightly concentrated in Sales (mostly General). JAN YCASAS's experience appears to be lower-to-mid level, with about 4 years of experience.",
            "workTime": {
                "months": 42,
                "years": 4
            },
            "managementTime": {
                "months": 0,
                "years": 0
            },
            "skills": "SKILLS\r\nProgramming Languages: HTML, PHP, JavaScript, MySQL, Java, Python\r\nTechnologies: Git, Laravel, SpringBoot, Docker, AWS, Kubernetes, Terraform"
            },
            "positions": [
            {
                "title": "Software Engineer Intern",
                "org": "Tableau",
                "summary": "-   Developed a tool that compares Data Visualizations between development environments\r\n-   Maintained and supported CI/CD pipeline, including integrating AWS keyless authentication\r\n-   Researched how to integrate different Data Sources for creating Data Visualization\r\n-   Utilized Kubernetes and Docker to deploy jobs and services\r\n-   Created new AWS services using Terraform which decreased deployment speed, allowed version control and is highly scalable.",
                "start": {
                "year": 2020,
                "month": 1,
                "timestamp": 1577865600000
                },
                "end": {
                "year": 2020,
                "month": 7,
                "timestamp": 1593586800000
                }
            },
            {
                "title": "Backend Software Developer Intern, Neurio",
                "org": "",
                "summary": "-   Designed, developed and deployed Java Micro-services that connects to an External API\r\n-   Communicated with senior developers to gather the project requirements\r\n-   Worked with other departments on technical issues regarding maintenance and bug fixes",
                "start": {
                "year": 2019,
                "month": 5,
                "timestamp": 1556694000000
                },
                "end": {
                "year": 2019,
                "month": 12,
                "timestamp": 1575187200000
                }
            },
            {
                "title": "Full Stack Developer",
                "org": "Strip Curtains",
                "summary": "-   Enabled the CMS control multiple E-Commerce website product and sales information through API's\r\n-   Provide a reliable system that improves employee's overall efficiency by over 50% through automating time\r\nconsuming tasks\r\n-   Recommended software improvements to ensure quality and optimization\r\n-   Provided logical technical solutions to business challenges\r\n-   Worked as a team to create and maintain various E-Commerce and CMS websites",
                "start": {
                "year": 2017,
                "month": 9,
                "timestamp": 1504249200000
                },
                "end": {
                "year": 2019,
                "month": 4,
                "timestamp": 1554102000000
                }
            },
            {
                "title": "Contract Software Developer, SRK",
                "org": "",
                "summary": "-   Build Microsoft Add-In that create custom reports\r\n-   Connected API Endpoints to communicate with the application",
                "start": {
                "year": 2017,
                "month": 1,
                "timestamp": 1483257600000
                },
                "end": {
                "year": 2017,
                "month": 9,
                "timestamp": 1504249200000
                }
            }
            ],
            "schools": [
            {
                "org": "Simon Fraser University",
                "degree": "Bachelor's Degree in Software Systems",
                "field": "Software Systems",
                "start": {
                "year": 2016,
                "month": 9,
                "timestamp": 1472713200000
                },
                "end": {
                "year": 2021,
                "month": 1,
                "timestamp": 1609488000000
                },
                "summary": "Simon Fraser University - Vancouver, Canada\tSeptember 2016 - January 2021\r\n-   Bachelor's Degree in Software Systems"
            },
            {
                "org": "British Columbia Institute Of Technology",
                "degree": "Diploma in Computer Systems Technology with Distinction",
                "field": "Computer Systems Technology",
                "start": {
                "year": 2014,
                "month": 9,
                "timestamp": 1409554800000
                },
                "end": {
                "year": 2016,
                "month": 6,
                "timestamp": 1464764400000
                },
                "summary": "British Columbia Institute Of Technology - Vancouver, Canada\tSeptember 2014 - June 2016\r\n-   Diploma in Computer Systems Technology with Distinction"
            }
            ]
        }
    }

---
## Upload resume to Google Cloud

`POST /resume/`

### Request

- file(File)
- userId(String)

### Response

    Status: 200 Ok

    {
        "url": "https://storage.googleapis.com/cmpt470-resumes/123/resume.pdf"
    }
