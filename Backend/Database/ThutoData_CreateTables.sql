CREATE DATABASE ThutoData;
Go

USE ThutoData
Go

CREATE TABLE University (
    UniversityID INT IDENTITY(1,1) PRIMARY KEY,
    UniversityName VARCHAR(150) NOT NULL,
    Abbreviation VARCHAR(20),
    Description TEXT,
    Province VARCHAR(50),
    City VARCHAR(100),
    InstitutionType VARCHAR(50),
    UniversityType VARCHAR(50),
    WebsiteURL VARCHAR(500)
);

CREATE TABLE Faculty (
    FacultyID INT IDENTITY(1,1) PRIMARY KEY,
    UniversityID INT NOT NULL,
    FacultyName VARCHAR(150) NOT NULL,
    Description TEXT,

    CONSTRAINT FK_Faculty_University
        FOREIGN KEY (UniversityID)
        REFERENCES University(UniversityID)
);

CREATE TABLE Course (
    CourseID INT IDENTITY(1,1) PRIMARY KEY,
    CourseName VARCHAR(200) NOT NULL,
    CourseCode VARCHAR(50),
    QualificationType VARCHAR(100),
    Description VARCHAR(MAX),
    DurationYears INT,
    StudyLevel VARCHAR(50),
    MinimumAPS INT,
    EntryRequirements VARCHAR(MAX),
    CareerOpportunities VARCHAR(MAX)
);


CREATE TABLE CourseOffered (
    OfferingID INT IDENTITY(1,1) PRIMARY KEY,

    CourseID INT NOT NULL,
    UniversityID INT NOT NULL,
    FacultyID INT NOT NULL,

    APSRequirement INT,
    SubjectRequirements TEXT,
    AdmissionRequirements TEXT,

    ApplicationInformation TEXT,
    ApplicationURL VARCHAR(500),

    CONSTRAINT FK_CourseOffered_Course
        FOREIGN KEY (CourseID)
        REFERENCES Course(CourseID),

    CONSTRAINT FK_CourseOffered_University
        FOREIGN KEY (UniversityID)
        REFERENCES University(UniversityID),

    CONSTRAINT FK_CourseOffered_Faculty
        FOREIGN KEY (FacultyID)
        REFERENCES Faculty(FacultyID)
);


CREATE TABLE Career (
    CareerID INT IDENTITY(1,1) PRIMARY KEY,
    CareerName VARCHAR(150) NOT NULL,
    CareerDescription TEXT
);

CREATE TABLE CourseCareer (
    CourseID INT NOT NULL,
    CareerID INT NOT NULL,

    PRIMARY KEY (CourseID, CareerID),

    CONSTRAINT FK_CourseCareer_Course
        FOREIGN KEY (CourseID)
        REFERENCES Course(CourseID),

    CONSTRAINT FK_CourseCareer_Career
        FOREIGN KEY (CareerID)
        REFERENCES Career(CareerID)
);

CREATE TABLE Funding (
    FundingID INT IDENTITY(1,1) PRIMARY KEY,
    FundingName VARCHAR(150) NOT NULL,
    Provider VARCHAR(150),
    FundingType VARCHAR(50),
    Description TEXT,
    Eligibility TEXT,
    Deadline DATE,
    ApplicationURL VARCHAR(500)
);

CREATE TABLE UniversityFunding (
    UniversityID INT NOT NULL,
    FundingID INT NOT NULL,

    PRIMARY KEY (UniversityID, FundingID),

    CONSTRAINT FK_UniversityFunding_University
        FOREIGN KEY (UniversityID)
        REFERENCES University(UniversityID),

    CONSTRAINT FK_UniversityFunding_Funding
        FOREIGN KEY (FundingID)
        REFERENCES Funding(FundingID)
);

CREATE TABLE ImportantDate (
    DateID INT IDENTITY(1,1) PRIMARY KEY,
    UniversityID INT NOT NULL,
    Title VARCHAR(150) NOT NULL,
    Description TEXT,
    Date DATE NOT NULL,
    DateType VARCHAR(50),
    URL VARCHAR(500),

    CONSTRAINT FK_ImportantDate_University
        FOREIGN KEY (UniversityID)
        REFERENCES University(UniversityID)
);

CREATE TABLE [User] (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(200) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Grade INT
);

CREATE TABLE Document (
    DocumentID INT IDENTITY(1,1) PRIMARY KEY,
    DocumentName VARCHAR(150) NOT NULL,
    Description TEXT,
    DocumentType VARCHAR(50),
    IsRequired BIT DEFAULT 0
);

CREATE TABLE UserDocument (
    UserID INT NOT NULL,
    DocumentID INT NOT NULL,
    IsCompleted BIT NOT NULL DEFAULT 0,

    PRIMARY KEY (UserID, DocumentID),

    CONSTRAINT FK_UserDocument_User
        FOREIGN KEY (UserID)
        REFERENCES [User](UserID),

    CONSTRAINT FK_UserDocument_Document
        FOREIGN KEY (DocumentID)
        REFERENCES Document(DocumentID)
);

CREATE TABLE PinnedCourse (
    UserID INT NOT NULL,
    CourseID INT NOT NULL,

    PRIMARY KEY (UserID, CourseID),

    CONSTRAINT FK_PinnedCourse_User
        FOREIGN KEY (UserID)
        REFERENCES [User](UserID),

    CONSTRAINT FK_PinnedCourse_Course
        FOREIGN KEY (CourseID)
        REFERENCES Course(CourseID)
);

CREATE TABLE PinnedUniversity (
    UserID INT NOT NULL,
    UniversityID INT NOT NULL,

    PRIMARY KEY (UserID, UniversityID),

    CONSTRAINT FK_PinnedUniversity_User
        FOREIGN KEY (UserID)
        REFERENCES [User](UserID),

    CONSTRAINT FK_PinnedUniversity_University
        FOREIGN KEY (UniversityID)
        REFERENCES University(UniversityID)
);

