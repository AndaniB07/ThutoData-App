USE ThutoData
Go

INSERT INTO [User] (Name, Email, Grade, PasswordHash)
VALUES (
    'Thabo Mokoena',
    'thabo.mokoena@example.com',
    12,
    '$2a$10$ASMiEiEHWd/BPAT/K0zFOe4OxLrouhO5K.RHn5IViXN6Z0C2Nla7y'
);

INSERT INTO UserDocument (UserID, DocumentID, IsCompleted)
VALUES
    (1, 1, 1),  -- ID: completed
    (1, 2, 1),  -- Matric Certificate: completed
    (1, 3, 1),  -- Academic Record: completed
    (1, 4, 0),  -- Proof of Residence: not completed
    (1, 5, 0),  -- Proof of Income: not completed
    (1, 6, 1),  -- Passport Photo: completed
    (1, 7, 0);  -- Acceptance Letter: not completed

INSERT INTO PinnedCourse (UserID, CourseID)
VALUES
    (1, 23),  -- Bachelor of Information Science
    (1, 30),  -- Bachelor of Science in Business Analytics
    (1, 11);  -- Bachelor of Arts (General Studies)

INSERT INTO PinnedUniversity (UserID, UniversityID)
VALUES
    (1, 8),   -- University of Pretoria
    (1, 10),  -- North-West University
    (1, 3);   -- University of KwaZulu-Natal


SELECT * FROM [User];
SELECT * FROM PinnedCourse;
SELECT * FROM PinnedUniversity;