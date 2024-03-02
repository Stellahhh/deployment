# Software Requirement Specification

## Problem Statement
Currently, students face challenges in accessing shared, targeted, and well-organized study resources, as well as valuable learning experiences for specific courses at Johns Hopkins University. This project is needed to streamline the learning process, enhance access to comprehensive study resources, and ultimately improve academic performance within the university community.

## Proposed Solution
Our web app aims to address this issue by creating a platform for students to share learning resources such as course reviews, notes, syllabi, and various other study resource bundles. Students can search for courses, upload their bundles, or course reviews to specific courses. Alternatively, students can also look for a specific course and download resource bundles uploaded by other students.

To ensure the quality and relevance of the shared resources, we will introduce an admin side responsible for censuring uploaded resources. Student users will register and log in with their JHU email and their JHED is visible to all users, this ensures that users are held accountable for the information they share. Additionally, we will include professor users where professors can post announcements and specify uploading policies for their courses.

Each course will have a discussion section where users can make posts and like other users’ posts, facilitating communication between students who have taken, are currently taking, and want to take a certain course.

## Potential Clients
JHU students, alumni, faculties

## Functional Requirements

Some terminologies we may use in the following user stories:
- Study Resource (a post which contains certain format of study resources (pdf, txt, links etc.))
- Discussion Post (a post students writes about their course experience)
- Resource Board (the board containing a list of study resources inside a course)
- Discussion Board (the board displaying all discussion posts inside a course)

### Student ### 
- As a student, I want to sign in using JHU credentials, so that I can use this application (get access to all study resources across the website, join discussion).
- As a student, I want to be able to edit my profile (including set username, change password, change avatar(?), etc.), so that I could keep my profile updated.
- As a student, I want to search for a course by course title (any part of it), so that I view the study resources and discussions related to that course.
- As a student, I want to be able to follow a course, so that I get direct access of the resources/discussions board related to that course from my “followed course list”.
- As a student, I want to upload study resources (in the format of links, pdfs, txt, docx, images), so that I can share resources with other students.
- As a student, I want to purchase a study resources using the points, so that I can get full access to the resources.
- As a student, I want to preview each of those study resources, so that I can decide whether or not I would buy it.
- As a student, I want to be able to download/access the resources after I purchase them, so that I could have access to them locally.
- As a student, I want to rate the study resources (from 1 - 5), so that I can inform other students’ the quality of this resource.
- As a student, I want to upload discussion posts, so that I can share my experiences with other students.
- As a student, I want to like others’ posts, so that I can interact with other students’.
- As a student, I want to gain points after uploading discussion posts, so that I would be able to use them to trade for study resources.
- As a student, I want to be able to mark courses as taken, so that I can directly access the resources/discussions board related to that course from my “taken course list”.

### Faculty ###
- As a faculty member, I want to be able to sign in as a verified user, so that I can have full access to the courses I own.
- As a faculty member, I want to be able to post notice in the discussion board of my courses, so that I could inform students who want to take the class some facts about this courses (that are not typically available / addressed on sis description).
- As a faculty member, I want to be able to post regulations in the resource board of my courses, so that I could inform students who want to share resources related to this course about what can be shared and what can not be.
- As a faculty member, I can view all study resources directly, so that I could identify problematic resources and find out some interesting resources.
- As a faculty member, I can view students’ discussions that are set visible to faculties, so that I see students’ learning experiences.

### Administrator ###
- As an admin, I want to be able to sign in as an admin user, so that I can view all resources.
- As an admin, I want to be able to view all details of each of those study resources, so that I can identify potential problems with those resources.
- As an admin, I want to be able to approve study resources, so that only resources allowed to be shared would be visible to students.
- As an admin, I want to be able to reject study resources, so that students won’t be able to upload invalid materials.

## Software Architecture & Technology Stack
Refer to [#2](https://github.com/cs421sp24-homework/project-team-08/issues/2#issuecomment-1944732377)

## Similar Existing Apps
- Studocu: An application where students could browse for study resources (mostly notes) for a course in a university.
- Chegg: Chegg's services, such as providing textbook solutions and homework help, have been misused by some students to seek answers for assignments and exams, leading to concerns about academic integrity. Our app is different in that it promotes a responsible and ethical approach to resource-sharing and aims to create a collaborative learning environment while implementing measures to prevent academic dishonesty.
- Piazza: A collaborative learning platform that facilitates communication and discussion among students and instructors within specific courses. Our app is different in that it allows users to view courses they are not enrolled in and learn about the instructor’s expectations and sample coursework before enrolling.
- Google Drive: Google Drive allows for collaborative document sharing and can be used for creating and sharing study resources within a community. Our app is different in that it provides targeted and specific information for courses, and adds a layer of customization and relevance compared to Google Drive.
