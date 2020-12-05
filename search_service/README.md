# REST API

Base URL: https://searchservice-pvwu2w75ta-uw.a.run.app

---
## Search for Job Postings

`POST /jobPosting?query={QUERY}&queryLimit={QUERY_LIMIT}&page={PAGE}`

### Request
- query(String) = Optional, if not filled gets all job posting sorted by creation in descending order
- queryLimit(Integer) = Optional, default value(10)
- page(Integer) = Optional, default value(1)

### Response

    Status: 200 OK

    {
        "_metadata": {
            "page": 1,
            "per_page": 2,
            "page_count": 2,
            "total_pages": 3,
            "total_count": 6,
            "links": [
                {
                    "self": "/jobPosting?queryLimit=2&page=1&query=Software"
                },
                {
                    "first": "/jobPosting?queryLimit=2&page=1&query=Software"
                },
                {
                    "last": "/jobPosting?queryLimit=2&page=3&query=Software"
                },
                {
                    "next": "/jobPosting?queryLimit=2&page=2&query=Software"
                }
            ]
        },
        "records": [
            {
                "_id": "5fc60586c6f6ce0cb570413d",
                "body": "At Cadence, we hire and develop leaders and innovators who want to make an impact on the world of technology.\nWe are looking for an outstanding senior computer engineering or computer science intern that who has a demonstrated history of writing and shipping production ready software. As a member of the inspectAR team, you will help fundamentally change the way electronics are worked on. This position requires a self-motivated, passionate individual with strong problem solving skills who can contribute to a dynamic team environment. We offer competitive salaries, great benefits, and most importantly are offering a massive opportunity to both directly add value and grow with the company. The role is flexible, and can be modified to fit the right candidate.\n\nSome example responsibilities could include:\n\nUnity, Object-Orientated App Programming (particularly in C#), and/or computer vision skills would benefit a contributor working on the commonly referred to \"inspectAR app\" codebase\n\nGolang and general backend experience would benefit a contributor working on the webapp and various backend services\n\nReact and general web experience would benefit a contributor\n\nC/C++ experience and an interest in low level programming would benefit a contributor for creating underlying operating system specific drivers and other plugins\n\nDevOps, UI/UX design, and more....\n\nBasically, if you have a demonstrated ability to build great things, fit the profile, and ready to bring your skills to the next level, we want to hear from you.\n\n***Please note: Time period for this internship would be from beginning of January 2021 through end of April 2021***\n\nWe’re doing work that matters. Help us solve what others can’t.",
                "company": "Cadence Design Systems",
                "salary": "NA",
                "title": "Intern - Software Engineering (Winter Term)",
                "location": "Saint John, NB",
                "user": "5fa79deb7f941208b97a0b4d",
                "username": "khoatxp",
                "createdAt": "2020-12-01T08:57:42.770Z",
                "applicants": [],
                "__v": 0
            },
            {
                "_id": "5fc604bec6f6ce0cb570413b",
                "body": "Job number:\n000458\nCompany:\nDelta Controls\nDepartment:\nVarious\nArea:\nSoftware Development\nDescription:\nWe have the opportunity for two students to join us in January 2021 for 8-month contracts. This call for resumes for Co-Op students of our local institutions to create a profile and an expression of interest. Positions are full-time while not in school and some are part-time during the semester.\nStart date:\nASAP\nWork location:\nThis position is located in our head office. Remote work may be available during COVID-19.\nCity:\nSurrey, BC\nCountry:\nCanada\nType:\nContract\nSchedule:\nTemporary full time\nDetails:\nAbout Delta Controls\n\nDelta Controls is the benchmark for building controls manufacturers, being one of the most respected organizations in our industry, with more than 300 installers in over 80 countries. For more than three decades Delta Controls has offered innovative and exciting building automation solutions for commercial, healthcare, education, leisure buildings and more. As industry leaders, our track record includes delivering the world’s first fully integrated native BACnet building solution encompassing HVAC, lighting and access products.\n\nAs part of Delta Electronics Inc. a $7+ billion USD organization, Delta Controls is able to bring some of the most energy efficient and sustainable solutions to buildings around the world, helping them with their vision of developing technologies aimed at reducing global warming and ensuring a sustainable future for mankind. Delta Electronics products includes a comprehensive range of variable frequency drives, industrial automation, UPS, visualization displays, LED lighting and renewable energy solutions.\n\nWhy join Delta?\n\nMake the world a better place: Develop web applications for sustainable buildings that reduce energy consumption and maximize occupant comfort.\n\nGrow: Employ new technologies and methodologies to solve the big problems – you will have ample opportunities to learn new skills, work in different Agile teams (6 – 10 members) as well as contribute in different stages of the development process.\n\nExtreme Ownership: We don’t believe job duties should be constrained by a title. There is no boundary on how deep you can debug. We expect you to ask how the feature is being used by end-user. You will be proud of on-time delivery and streamlined user experience because you make it happen!\n\nBest of all, you will do all of the above in a diverse and fun team!\n\nResponsibilities:\nWe have two Co-Op placements for students in Software Developers and Software QA roles. Here are breakdowns of the available Co-Op placements available including the type of role we have, the preferred skill set, and program/field of study you would be in:\n\nSoftware Quality Assurance Role\n\nRole: Work with the Software Quality Assurance team on various projects including test wall construction and test rack construction including shelving, wiring, and power. As well as test script development, maintenance, and execution, manual tests development, maintenance, and execution, docker and container evaluation.\n\nSkills: Proficient in Python, Linux and Windows environments. Familiarity with agile processes with scrums, sprints, standups, triages, and grooming sessions. Tools include Jira, Confluence, and Git.\n\nProgram/Field of Study: Computer Engineering, Mechatronics, or Computer Sciences.\n\nCloud Service Development Role\n\nRole: Research on Terraform. Work with a cloud service development team to transfer exist cloud infrastructure to manageable configurations. Develop plans to streamline the deployment process.\n\nSkills: Proficient in Google Cloud Platform, Node.js, Firebase, Linux environment. Familiarity with agile processes with scrums, sprints, standups, triages, and grooming sessions.\n\nProgram/Field of Study: Computer Engineering, Computer Science.\n\n\nMain skills required:\nThird and fourth-year university students registered in a co-op program\nPrefer one year or more of experience in area of specialty\nYears of relevant experience required:\n1 year\nEducation required:\nin Undergraduate co-op program\nEducation required (other):\n3rd and 4th year students\nCompensation details:\nIn addition to the competitive compensation package, we also offer a unique work environment that is designed for people who like to work hard and play hard too! Here are just a few examples:\n\nOn-site gym and weight room with personal trainers\nAccess to a private multifunctional indoor gymnasium\nRRSP matching\nComprehensive extended group health and dental benefits\nPlease ensure you specify on your cover letter or application which role you are applying for, eg: Embedded Software Development Role.\n\nTo apply, complete or update your profile and submit the application form on our web site (https://careers.deltacontrols.com) and then go to the applied jobs list to ensure your application has been fully processed. You are also welcome to add or manage job alerts within your candidate account.\n\n\nLocal candidates are preferred. No relocation will be offered for this position. Must be legally-entitled to work in the country where the job is offered, for any employer, without requiring sponsorship. While we will consider all applications, only those short-listed for interviews will be contacted. No phone calls, please. No outside agencies or recruiters, please.\nKeywords:\nCo-op, Students, Software, Test",
                "company": "Delta Controls",
                "salary": "NA",
                "title": "Co-op Students - Software and Software Test",
                "location": "Surrey, BC",
                "user": "5fa79deb7f941208b97a0b4d",
                "username": "khoatxp",
                "createdAt": "2020-12-01T08:54:22.882Z",
                "applicants": [],
                "__v": 0
            }
        ]
        }
---

## Find By Specifc Job Posting id
`POST /jobPosting/{JOB_POSTING_ID}`

### Request
- JOB_POSTING_ID(String)

### Response

    Status: 200 OK

    {
        "_id": "5fc5f3ed7a8aa90ae10793e0",
        "body": "BODY",
        "company": "Eigen Development Ltd.",
        "salary": "NA",
        "title": "Junior Web Software Developer (Vancouver)",
        "location": "Vancouver, BC",
        "user": "5fa79deb7f941208b97a0b4d",
        "username": "khoatxp",
        "createdAt": "2020-12-01T07:42:37.862Z",
        "applicants": [
            {
                "_id": "5fc5f4057a8aa90ae10793e1",
                "username": "test",
                "user": "5fad818f322f030017b7b759",
                "resume": "{\"data\":{\"createdAt\":1606808568729,\"lastStoryAt\":1606808568729,\"names\":[\"Gavin Lee\"],\"emails\":[{\"value\":\"gavlee@sfu.ca\",\"canonical\":\"gavlee@sfu.ca\"}],\"phones\":[{\"value\":\"778-123-4567\",\"type\":\"home\"}],\"location\":{\"name\":\"Langley, BC\",\"address\":{\"CountryCode\":\"CA\",\"PostalCode\":\"V5G 4O1\",\"Region\":\"BC\",\"Municipality\":\"Langley\",\"DeliveryAddress\":{\"AddressLine\":\"1234 Robin Road\"}}},\"summary\":{\"experience\":\"Gavin Lee's experience appears to be slightly concentrated in Engineering (mostly Air and Aerospace) and slightly concentrated in Common End-user Software (mostly Core Office). Gavin Lee's experience appears to be entry level, with 22 months of experience.\",\"workTime\":{\"months\":22,\"years\":2},\"managementTime\":{\"months\":0,\"years\":0},\"skills\":\"Skills   •   Knowledgeable in C++, C and Java programming languages\\r\\n•   Able to work and manage integrated home networks with different OS environments\\r\\nsuch as Windows, OSX, Linux, Android, and IOS\\r\\n•   Highly skilled in the use of Microsoft Office including Word, Excel, and PowerPoint\\r\\n•   Able to operate basic lab equipment such as: A Function Generator, Oscilloscope,\\r\\nDMM, Power Supply, and soldering workstations\\r\\n•   Able to use essential engineering software, such as, MatLab, and LTSpice\\r\\n\\r\\n\\r\\nWork\\tSchool District Electrical Apprentice\\tMar 2020\"},\"positions\":[{\"title\":\"Audio and Visual Technician\",\"org\":\"Pentecostal Church\",\"summary\":\"Instructing others on how to operate the soundboard properly through hands-on\\r\\nand verbal training\\r\\n\\n\\n•   Advising the chair members by speaking out my concerns about any technical\\r\\nissues, so that it may be resolved in a timely and costly manner\",\"start\":{\"year\":2019,\"month\":8,\"timestamp\":1564642800000},\"isCurrent\":true},{\"title\":\"Volunteer\",\"org\":\"Pentecostal Church\",\"summary\":\"Dealing with children that exhibits behavioral issues and disorders by patiently\\r\\nprofiling their behavior to find the best way to adapt to their needs\\r\\n\\n\\n•   Dividing tasks among leaders by creating detailed schedules so everyone knows\\r\\ntheir roles inside and out\",\"start\":{\"year\":2020,\"month\":7,\"timestamp\":1593586800000},\"isCurrent\":true},{\"title\":\"Children's Program Secretary\",\"org\":\"Burnaby Alliance Church\",\"summary\":\"\\n\\n•   Documenting detailed minutes during all meetings in Microsoft Word, Excel, and keeping track of all attendance records of children, staff, and volunteers\\r\\n\\n\\n•   Keeping inventory in stock by ordering only what is needed to ensure everything\\r\\ncomes on time while working under a constrained budget\",\"start\":{\"year\":2019,\"month\":9,\"timestamp\":1567321200000},\"end\":{\"year\":2020,\"month\":6,\"timestamp\":1590994800000}},{\"org\":\"Circuit Board Soldering\",\"summary\":\"Designed a circuit board using LTSpice, whose function is to create sinusoidal\\r\\nwaves and light\\r\\n\\n\\n•   Implemented the design by correctly identifying the parts needed, and carefully\\r\\nsoldering the components to mother board to obtain the expected results\",\"start\":{\"year\":2019,\"month\":9,\"timestamp\":1567321200000},\"end\":{\"year\":2019,\"month\":12,\"timestamp\":1575187200000}},{\"org\":\"Climate Control Simulator\",\"summary\":\"Understood the assignment given, by dividing the problem into smaller segments\\r\\nto create a final solution\\r\\n\\n\\n•   Created a solution using both C and C++ and a wide selection of arrays, loops,\\r\\nand functions to develop the most optimized algorithm\",\"start\":{\"year\":2019,\"month\":9,\"timestamp\":1567321200000},\"end\":{\"year\":2019,\"month\":12,\"timestamp\":1575187200000}},{\"org\":\"Umbrella Dryer\",\"summary\":\"Invented an idea for students with wet umbrella's by building mechanical device\\r\\nconsisting of a system of gears and microfiber cloths to dry their umbrellas\\r\\n\\n\\n•   Presented the project by highlighting the projects weakness, and making it the selling point of the presentation\\r\\nAPEG B.C Popsicle Stick Bridge Competition - Self Directed\\tJan-Apr 2019\\r\\n\\n\\n•   Researched and used a simulator to test different bridge structures to effectively\\r\\ndebate with other colleagues in building a winning bridge design\",\"start\":{\"year\":2019,\"month\":9,\"timestamp\":1567321200000},\"end\":{\"year\":2019,\"month\":12,\"timestamp\":1575187200000}},{\"title\":\"Technical Support, Sales and Computer Refurbishing Volunteer\",\"org\":\"BestBuy\",\"summary\":\"Diagnose and troubleshoot computer problems by logically isolating causes that\\r\\nmay contribute to the anomaly, to provide the customer with a working machine\\r\\n\\n\\n•   Determined the computers' functionality by examining the logic boards for blown\\r\\nfuses, or signs of wear resulting in if the component shall be salvaged or discarded\",\"start\":{\"year\":2019,\"month\":6,\"timestamp\":1559372400000},\"end\":{\"year\":2019,\"month\":8,\"timestamp\":1564642800000}}],\"schools\":[{\"org\":\"Simon Fraser University\",\"degree\":\"Bachelor of Applied Sciences\",\"field\":\"Electronics Engineering\",\"start\":{\"year\":2017,\"month\":9,\"timestamp\":1504249200000},\"isCurrent\":true,\"summary\":\"Simon Fraser University (SFU), Burnaby, BC\\tSep 2017-Present\\r\\n\\n\\n•   Bachelor of Applied Sciences - Electronics Engineering\"}]}}",
                "submittedAt": "2020-12-01T07:43:01.551Z",
                "originalFile": "https://storage.googleapis.com/cmpt470-resumes/5fad818f322f030017b7b759/resume.pdf"
                }
        ],
        "__v": 0
    }