USE ThutoData
Go

-- =========================================================
-- UNIVERSITY / COLLEGE DATA
-- =========================================================

INSERT INTO University
    (UniversityName, Abbreviation, Description, Province, City,
     InstitutionType, UniversityType, WebsiteURL)
VALUES

-- UNIVERSITIES
('University of Limpopo',
 'UL',
 'Known for producing health and science professionals, rural community development, agriculture, and strong medicine and health science programmes.',
 'Limpopo',
 'Mankweng / Polokwane',
 'University',
 'Public',
 'https://www.ul.ac.za/'),

('University of Venda',
 'UNIVEN',
 'Known for career-focused programmes, agricultural development, rural development studies, and environmental sciences.',
 'Limpopo',
 'Thohoyandou',
 'University',
 'Public',
 'https://www.univen.ac.za/'),

('University of KwaZulu-Natal',
 'UKZN',
 'Highly ranked for research, medical education, engineering, law, and science programmes.',
 'KwaZulu-Natal',
 'Durban / Pietermaritzburg',
 'University',
 'Public',
 'https://www.ukzn.ac.za/'),

('Durban University of Technology',
 'DUT',
 'Known for practical vocational training, engineering technology, ICT, health sciences, and arts and design programmes.',
 'KwaZulu-Natal',
 'Durban / Pietermaritzburg',
 'University',
 'Public',
 'https://www.dut.ac.za/'),

('Mangosuthu University of Technology',
 'MUT',
 'Known for practical engineering courses, management sciences, and accessible career-oriented diplomas and degrees.',
 'KwaZulu-Natal',
 'Umlazi / Durban',
 'University',
 'Public',
 'https://www.mut.ac.za/'),

('University of Zululand',
 'UNIZULU',
 'Known for comprehensive education programmes, public administration, law, and arts degrees serving communities in coastal KwaZulu-Natal.',
 'KwaZulu-Natal',
 'KwaDlangezwa / Richards Bay',
 'University',
 'Public',
 'https://www.unizulu.ac.za/'),

('University of South Africa',
 'UNISA',
 'Africa''s largest open distance learning university, providing flexible remote higher education across multiple fields.',
 'Gauteng',
 'Pretoria',
 'University',
 'Public',
 'https://www.unisa.ac.za/'),

('University of Pretoria',
 'UP',
 'Known for leading research outputs, veterinary science, business, law, engineering, and health sciences.',
 'Gauteng',
 'Pretoria',
 'University',
 'Public',
 'https://www.up.ac.za/'),

('University of Johannesburg',
 'UJ',
 'Known for integrating Fourth Industrial Revolution technologies into learning and for programmes in accounting, design, law, engineering, health sciences, humanities, and science.',
 'Gauteng',
 'Johannesburg',
 'University',
 'Public',
 'https://www.uj.ac.za/'),

('North-West University',
 'NWU',
 'Known for strong student culture and research in health sciences, pharmacy, business, education, engineering, and related fields.',
 'North West',
 'Potchefstroom / Mahikeng / Vanderbijlpark',
 'University',
 'Public',
 'https://www.nwu.ac.za/'),


-- TVET COLLEGES - LIMPOPO
('Capricorn TVET College',
 NULL,
 'Known for engineering, business, and information technology training.',
 'Limpopo',
 'Polokwane',
 'College',
 'Public',
 'https://www.studentroom.co.za/capricorn-tvet-college/'),

('Lephalale TVET College',
 NULL,
 'Known for engineering and mining skills training.',
 'Limpopo',
 'Lephalale',
 'College',
 'Public',
 'https://www.studentroom.co.za/lephalale-tvet-college/'),

('Letaba TVET College',
 NULL,
 'Known for agriculture, office management, and engineering programmes.',
 'Limpopo',
 'Tzaneen',
 'College',
 'Public',
 'https://www.studentroom.co.za/letaba-tvet-college/'),

('Mopani South East TVET College',
 NULL,
 'Known for mining, engineering skills, and business studies.',
 'Limpopo',
 'Phalaborwa',
 'College',
 'Public',
 'https://www.studentroom.co.za/list-of-courses-offered-at-mopani-south-east-tvet-college/'),

('Sekhukhune TVET College',
 NULL,
 'Known for practical civil engineering, mechanical trades, and business management.',
 'Limpopo',
 'Groblersdal / Motetema',
 'College',
 'Public',
 'https://www.studentroom.co.za/sekhukhune-tvet-college/'),

('Vhembe TVET College',
 NULL,
 'Known for vocational ICT, agriculture, electrical engineering, and hospitality.',
 'Limpopo',
 'Sibasa / Makwarela',
 'College',
 'Public',
 'https://www.studentroom.co.za/vhembe-tvet-college/'),

('Waterberg TVET College',
 NULL,
 'Known for agriculture, engineering, and IT programmes.',
 'Limpopo',
 'Mokopane',
 'College',
 'Public',
 'https://www.studentroom.co.za/waterberg-tvet-college/'),


-- TVET COLLEGES - KWAZULU-NATAL
('Coastal TVET College',
 NULL,
 'Known for mechanical engineering, maritime, and business skills.',
 'KwaZulu-Natal',
 'Umlazi / Amanzimtoti',
 'College',
 'Public',
 'https://kznuniupdates.org/coastal-kz/'),

('Elangeni TVET College',
 NULL,
 'Known for business management, hospitality, primary agriculture, and information technology.',
 'KwaZulu-Natal',
 'Pinetown / Durban North',
 'College',
 'Public',
 'https://kznuniupdates.org/elangeni-tvet-college/'),

('Esayidi TVET College',
 NULL,
 'Known for coastal technical training, tourism, and engineering trades.',
 'KwaZulu-Natal',
 'Port Shepstone / South Coast',
 'College',
 'Public',
 'https://kznuniupdates.org/esayidi-tvet/'),

('Majuba TVET College',
 NULL,
 'Known for heavy engineering training, boilermaking, and technical fields.',
 'KwaZulu-Natal',
 'Newcastle',
 'College',
 'Public',
 'https://kznuniupdates.org/majuba-tvet/'),

('Mnambithi TVET College',
 NULL,
 'Known for hospitality, tourism, business studies, and electrical engineering.',
 'KwaZulu-Natal',
 'Ladysmith',
 'College',
 'Public',
 'https://kznuniupdates.org/mnambithi-tvet/'),

('Mthashana TVET College',
 NULL,
 'Known for rural development, primary agriculture, civil engineering, and trade skills.',
 'KwaZulu-Natal',
 'Vryheid',
 'College',
 'Public',
 'https://kznuniupdates.org/mthashana/'),

('Thekwini TVET College',
 NULL,
 'Known for urban technical training, engineering, and business management in central Durban.',
 'KwaZulu-Natal',
 'Durban',
 'College',
 'Public',
 'https://kznuniupdates.org/thekwini-college/'),

('Umfolozi TVET College',
 NULL,
 'Known for industrial engineering, craft training, safety in society, and ICT.',
 'KwaZulu-Natal',
 'Richards Bay / Zululand',
 'College',
 'Public',
 'https://kznuniupdates.org/umfolozi-tvet/'),

('Umgungundlovu TVET College',
 NULL,
 'Known for civil engineering, business studies, ICT, and apparel design.',
 'KwaZulu-Natal',
 'Pietermaritzburg',
 'College',
 'Public',
 'https://kznuniupdates.org/umgungundlovu-tvet-college/'),


-- TVET COLLEGE - MPUMALANGA
('Gert Sibande TVET College',
 NULL,
 'Known for engineering, agricultural sciences, and business management training.',
 'Mpumalanga',
 'Standerton / Ermelo',
 'College',
 'Public',
 'https://gscollege.edu.za/');


-- =============================================
-- FACULTY DATA
-- =============================================

-- University of Limpopo
INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Humanities', UniversityID
FROM University
WHERE UniversityName = 'University of Limpopo';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Science and Agriculture', UniversityID
FROM University
WHERE UniversityName = 'University of Limpopo';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Health Sciences', UniversityID
FROM University
WHERE UniversityName = 'University of Limpopo';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Management and Law', UniversityID
FROM University
WHERE UniversityName = 'University of Limpopo';


-- University of Venda
INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Humanities, Social Sciences and Education', UniversityID
FROM University
WHERE UniversityName = 'University of Venda';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Health Sciences', UniversityID
FROM University
WHERE UniversityName = 'University of Venda';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Management, Commerce and Law', UniversityID
FROM University
WHERE UniversityName = 'University of Venda';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Science, Engineering and Agriculture', UniversityID
FROM University
WHERE UniversityName = 'University of Venda';


-- University of KwaZulu-Natal
INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'College of Agriculture, Engineering and Science', UniversityID
FROM University
WHERE UniversityName = 'University of KwaZulu-Natal';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'College of Health Sciences', UniversityID
FROM University
WHERE UniversityName = 'University of KwaZulu-Natal';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'College of Humanities', UniversityID
FROM University
WHERE UniversityName = 'University of KwaZulu-Natal';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'College of Law and Management Studies', UniversityID
FROM University
WHERE UniversityName = 'University of KwaZulu-Natal';


-- Mangosuthu University of Technology
INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Engineering', UniversityID
FROM University
WHERE UniversityName = 'Mangosuthu University of Technology';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Management Sciences', UniversityID
FROM University
WHERE UniversityName = 'Mangosuthu University of Technology';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Natural Sciences', UniversityID
FROM University
WHERE UniversityName = 'Mangosuthu University of Technology';


-- University of Zululand
INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Humanities and Social Sciences', UniversityID
FROM University
WHERE UniversityName = 'University of Zululand';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Education', UniversityID
FROM University
WHERE UniversityName = 'University of Zululand';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Commerce, Administration and Law', UniversityID
FROM University
WHERE UniversityName = 'University of Zululand';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Science, Agriculture and Engineering', UniversityID
FROM University
WHERE UniversityName = 'University of Zululand';


-- University of Pretoria
INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Economic and Management Sciences', UniversityID
FROM University
WHERE UniversityName = 'University of Pretoria';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Education', UniversityID
FROM University
WHERE UniversityName = 'University of Pretoria';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Engineering, Built Environment and Information Technology', UniversityID
FROM University
WHERE UniversityName = 'University of Pretoria';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Natural and Agricultural Sciences', UniversityID
FROM University
WHERE UniversityName = 'University of Pretoria';


-- University of Johannesburg
INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Art, Design and Architecture', UniversityID
FROM University
WHERE UniversityName = 'University of Johannesburg';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'College of Business and Economics', UniversityID
FROM University
WHERE UniversityName = 'University of Johannesburg';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Engineering and the Built Environment', UniversityID
FROM University
WHERE UniversityName = 'University of Johannesburg';


-- North-West University
INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Health Sciences', UniversityID
FROM University
WHERE UniversityName = 'North-West University';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Natural and Agricultural Sciences', UniversityID
FROM University
WHERE UniversityName = 'North-West University';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Economic and Management Sciences', UniversityID
FROM University
WHERE UniversityName = 'North-West University';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Education', UniversityID
FROM University
WHERE UniversityName = 'North-West University';


-- Durban University of Technology
INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Health Sciences', UniversityID
FROM University
WHERE UniversityName = 'Durban University of Technology';

INSERT INTO Faculty (FacultyName, UniversityID)
SELECT 'Faculty of Accounting and Informatics', UniversityID
FROM University
WHERE UniversityName = 'Durban University of Technology';

-- =========================================================
-- COURSES
-- =========================================================

INSERT INTO Course
    (CourseCode, CourseName, QualificationType, Description, DurationYears, StudyLevel, CareerOpportunities)
VALUES

-- UNIVERSITY OF LIMPOPO
('BInfSt',
 'Bachelor of Information Studies',
 'Bachelor''s Degree',
 'A programme in information studies covering the management, organisation, analysis and dissemination of information.',
 4,
 'Undergraduate',
 'Indexer, Abstracter, Information Consultant, Information Analyst, Information Specialist, Librarian'),

('BAgricMan',
 'Bachelor of Agricultural Management',
 'Bachelor''s Degree',
 'A programme focused on agricultural management and related agricultural practices.',
 3,
 'Undergraduate',
 NULL),

(NULL,
 'Bachelor of Science in Dietetics',
 'Bachelor''s Degree',
 'A programme preparing students for professional practice in dietetics and nutrition.',
 4,
 'Undergraduate',
 NULL),

('LLB',
 'Bachelor of Laws',
 'Bachelor''s Degree',
 'A professional undergraduate qualification in law.',
 4,
 'Undergraduate',
 NULL),


-- UNIVERSITY OF VENDA

('HSBBSW',
 'Bachelor of Social Work',
 'Bachelor''s Degree',
 'A programme preparing students for professional social work practice.',
 4,
 'Undergraduate',
 NULL),

('SHBBN',
 'Bachelor of Nursing',
 'Bachelor''s Degree',
 'A professional nursing qualification preparing students for nursing practice.',
 4,
 'Undergraduate',
 NULL),

('MSBBAD',
 'Bachelor of Administration in Public Administration',
 'Bachelor''s Degree',
 'A programme focused on public administration and the management of public-sector organisations.',
 3,
 'Undergraduate',
 NULL),

('MNDDFT',
 'Technology',
 'Diploma',
 'A technology-oriented qualification requiring a diploma-level admission pathway.',
 3,
 'Undergraduate',
 NULL),


-- UNIVERSITY OF KWAZULU-NATAL

('KN-H-BSL',
 'Bachelor of Science in Surveying',
 'Bachelor''s Degree',
 'A programme focused on surveying and related scientific and technical practices.',
 4,
 'Undergraduate',
 NULL),

('KN-W-BPA',
 'Bachelor of Audiology',
 'Bachelor''s Degree',
 'A professional qualification in audiology.',
 4,
 'Undergraduate',
 NULL),

('KN-H-BA2',
 'Bachelor of Arts (General Studies)',
 'Bachelor''s Degree',
 'A broad Bachelor of Arts programme offering general studies across humanities and related disciplines.',
 3,
 'Undergraduate',
 NULL),

('KN-W-B5I',
 'Bachelor of Business Science in Investment Science',
 'Bachelor''s Degree',
 'A programme focused on investment science and financial decision-making.',
 4,
 'Undergraduate',
 NULL),


-- MANGOSUTHU UNIVERSITY OF TECHNOLOGY

('MN-M-EE5',
 'Diploma in Electrical Engineering',
 'Diploma',
 'A technical engineering qualification focused on electrical engineering.',
 3,
 'Undergraduate',
 NULL),

('MN-M-PF3',
 'Diploma in Finance and Accounting',
 'Diploma',
 'A qualification focused on finance and accounting, including financial and accounting principles.',
 4,
 'Undergraduate',
 NULL),

('MN-M-BLS',
 'Bachelor of Health Science in Medical Laboratory Sciences',
 'Bachelor''s Degree',
 'A health sciences qualification focused on medical laboratory sciences.',
 4,
 'Undergraduate',
 NULL),

('MN-M-BD3',
 'Diploma in Biomedical Science',
 'Diploma',
 'A qualification focused on biomedical science and related laboratory and scientific practices.',
 3,
 'Undergraduate',
 NULL),


-- UNIVERSITY OF ZULULAND

(NULL,
 'Bachelor of Arts in Psychology',
 'Bachelor''s Degree',
 'A Bachelor of Arts programme specialising in Psychology.',
 3,
 'Undergraduate',
 NULL),

(NULL,
 'Bachelor of Education in Foundation Phase Teaching',
 'Bachelor''s Degree',
 'A teacher education programme specialising in Foundation Phase teaching.',
 4,
 'Undergraduate',
 NULL),

(NULL,
 'Higher Certificate in Accountancy',
 'Higher Certificate',
 'A higher certificate qualification focused on accountancy.',
 1,
 'Undergraduate',
 NULL),

(NULL,
 'Bachelor of Consumer Science: Extension and Rural Development',
 'Bachelor''s Degree',
 'A programme focused on consumer science, extension and rural development.',
 4,
 'Undergraduate',
 NULL),


-- UNIVERSITY OF PRETORIA

(NULL,
 'Bachelor of Commerce specialising in Investment Management',
 'Bachelor''s Degree',
 'A commerce qualification specialising in investment management.',
 3,
 'Undergraduate',
 'Portfolio/fund manager, Investment analyst, Risk manager/analyst, Quantitative analyst, Financial advisor/planner, Wealth manager'),

(NULL,
 'Higher Certificate in Sports Sciences',
 'Higher Certificate',
 'A higher certificate programme focused on sports sciences, sports coaching and the sports and exercise industry.',
 1,
 'Undergraduate',
 'Sports coaching and roles in the sports and exercise industry'),

(NULL,
 'Bachelor of Information Science',
 'Bachelor''s Degree',
 'A programme focused on information and knowledge management, information products and systems.',
 3,
 'Undergraduate',
 'Information and knowledge manager, Information specialist, E-commerce specialist, Information consultant, Information broker, System specialist'),

(NULL,
 'Bachelor of Science in Food Management: Nutritional Science',
 'Bachelor''s Degree',
 'An interfaculty programme focusing on food management and nutritional science.',
 4,
 'Undergraduate',
 'Opportunities in food and related industries, pharmaceutical and food manufacturing, government departments, international organisations, NGOs and research organisations'),


-- UNIVERSITY OF JOHANNESBURG

('B8BA3Q',
 'Bachelor of Architecture',
 'Bachelor''s Degree',
 'A professional programme focused on architecture, design and construction of the built environment.',
 NULL,
 'Undergraduate',
 'Architectural professional involved in building design, technological resolution and construction management'),

('B34CAQ',
 'Bachelor of Accounting (CA)',
 'Bachelor''s Degree',
 'A Bachelor degree programme in accounting preparing students for a career as a Chartered Accountant.',
 3,
 'Undergraduate',
 'Chartered Accountant – CA (SA)'),

('B34I7Q',
 'Bachelor of Industrial Psychology',
 'Bachelor''s Degree',
 'A programme focused on industrial psychology and workplace relationships.',
 3,
 'Undergraduate',
 'Specialist HR practitioner'),

('B6CS0Q',
 'Bachelor of Civil Engineering',
 'Bachelor''s Degree',
 'A programme focused on the design and construction of infrastructure.',
 NULL,
 'Undergraduate',
 'Civil engineering and infrastructure design and construction'),

-- NORTH-WEST UNIVERSITY

(NULL,
 'Diploma in Coaching Science',
 'Diploma',
 'A qualification focused on sport coaching and coaching science.',
 2,
 'Undergraduate',
 'Sport coaching'),

(NULL,
 'Bachelor of Science in Business Analytics',
 'Bachelor''s Degree',
 'A programme focused on business analytics and the use of analytical methods in business.',
 3,
 'Undergraduate',
 NULL),

(NULL,
 'Bachelor of Arts in Industrial and Organisational Psychology and Labour Relations Management',
 'Bachelor''s Degree',
 'A programme combining industrial and organisational psychology with labour relations management.',
 3,
 'Undergraduate',
 NULL),

(NULL,
 'Bachelor of Education in Early Childhood Care and Education',
 'Bachelor''s Degree',
 'A teacher education programme focused on early childhood care and education.',
 4,
 'Undergraduate',
 NULL),


-- DURBAN UNIVERSITY OF TECHNOLOGY

(NULL,
 'Bachelor of Health Sciences in Emergency Medical Care and Rescue',
 'Bachelor''s Degree',
 'A professional health sciences programme combining theoretical and practical emergency medical care and rescue training.',
 4,
 'Undergraduate',
 'Paramedic, Emergency medical care practitioner, Emergency medical services professional, Fire department roles, Military emergency services'),

('BHRDT1',
 'Bachelor of Health Sciences in Diagnostic Sonography',
 'Bachelor''s Degree',
 NULL,
 NULL,
 'Undergraduate',
 NULL),

(NULL,
 'Diploma in Taxation',
 'Diploma',
 'A three-year programme providing knowledge of taxation and auditing.',
 3,
 'Undergraduate',
 'Tax practitioner, Financial department employee'),

(NULL,
 'Diploma in Library and Information Studies',
 'Diploma',
 'A qualification focused on information organisation, information retrieval, information dissemination, bibliographic control and metadata practices.',
 3,
 'Undergraduate',
 'Information and knowledge professional in corporate and public organisations');


-- =========================================================
-- CourseOffered
-- =========================================================

-- UNIVERSITY OF LIMPOP
 INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    25,
    'English level 4/5. Another language (Northern Sotho, Tshivenda or Xitsonga) level 4/5.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Limpopo'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Humanities'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'BInfSt';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    24,
    'English level 4. Mathematics level 3. Physical Science level 0. Life Science level 4. Agricultural subject level 4.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Limpopo'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Science and Agriculture'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'BAgricMan';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    26,
    'English level 4. Mathematics level 4. Physical Science level 5. Life Science level 5. Additional subjects 1 and 2 level 4.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Limpopo'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Health Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Bachelor of Science in Dietetics';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    30,
    'English level 5.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Limpopo'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Management and Law'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'LLB';

-- UNIVERSITY OF VENDA
INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    35,
    'NSC 35+ with an adequate achievement (50–59%) or better in English.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Venda'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Humanities, Social Sciences and Education'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'HSBBSW';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    38,
    'NSC 38+. Adequate achievement (60–69%) in Life Sciences, English and Physical Sciences, and Mathematics at 50–59%, excluding Life Orientation.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Venda'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Health Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'SHBBN';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    32,
    'NSC 32+. English at 50–59% and any three subjects at 40–49%.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Venda'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Management, Commerce and Law'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'MSBBAD';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    24,
    'Diploma admission requirement. English at 40–49% in four recognised 20-credit NSC subjects and 50% in either Life Sciences, Agricultural Sciences, Physical Sciences or Geography.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Venda'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Science, Engineering and Agriculture'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'MNDDFT';

-- UKZN
INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    33,
    'NSC-Deg with Mathematics and Physical Science level 5 (at least 65%), and English and Life Orientation level 4.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of KwaZulu-Natal'
JOIN Faculty f
    ON f.FacultyName = 'College of Agriculture, Engineering and Science'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'KN-H-BSL';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    33,
    'NSC-Deg with English and Life Orientation level 4 and Mathematics plus Life Sciences or Physical Science level 3.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of KwaZulu-Natal'
JOIN Faculty f
    ON f.FacultyName = 'College of Health Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'KN-W-BPA';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    28,
    'NSC-Deg with English and Life Orientation level 4 and one approved subject at level 5.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of KwaZulu-Natal'
JOIN Faculty f
    ON f.FacultyName = 'College of Humanities'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'KN-H-BA2';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    33,
    'NSC-Deg with Mathematics level 6 and English and Life Orientation level 4.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of KwaZulu-Natal'
JOIN Faculty f
    ON f.FacultyName = 'College of Law and Management Studies'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'KN-W-B5I';

-- MUT
INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    'Mathematics level 4. Physical Science level 4. English First Additional Language level 4.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'Mangosuthu University of Technology'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Engineering'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'MN-M-EE5';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    'English Home Language level 4. English First Additional Language level 5. Accounting level 4. Mathematics level 3 OR Mathematics Literacy level 6.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'Mangosuthu University of Technology'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Management Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'MN-M-PF3';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    'Bachelor pass. English Home Language level 4. Life Sciences level 4. Mathematics level 4. Physical Science level 4.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'Mangosuthu University of Technology'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Natural Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'MN-M-BLS';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    'English Home Language level 4. English First Additional Language level 4. Mathematics level 4. Life Sciences level 4 OR Physical Science level 4. Compulsory entrance test.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'Mangosuthu University of Technology'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Natural Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'MN-M-BD3';

-- UNIZULU
INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    28,
    'NSC Degree with English level 4, Social Science (Geography or History) level 4 and four 20-credit subjects.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Zululand'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Humanities and Social Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Bachelor of Arts in Psychology';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    26,
    'NSC Degree with isiZulu Home Language level 4, English First Additional Language level 4, and Mathematics level 3 OR Mathematics Literacy level 4.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Zululand'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Education'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Bachelor of Education in Foundation Phase Teaching';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    22,
    'NSC Certificate endorsement with English level 3 and Mathematics level 3 OR Mathematics Literacy level 4.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Zululand'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Commerce, Administration and Law'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Higher Certificate in Accountancy';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    28,
    'NSC Degree with English and Life Orientation level 4 and Life Sciences OR Agricultural Sciences level 4.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Zululand'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Science, Agriculture and Engineering'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Bachelor of Consumer Science: Extension and Rural Development';

-- UP
INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    34,
    'English level 5 and Mathematics level 6.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Pretoria'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Economic and Management Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Bachelor of Commerce specialising in Investment Management';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    20,
    'Higher Certificate admission requirements. Selection process applies.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Pretoria'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Education'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Higher Certificate in Sports Sciences';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    28,
    'English level 4. Mathematics level 5 is required if Information Systems is selected as a first-year subject.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Pretoria'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Engineering, Built Environment and Information Technology'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Bachelor of Information Science';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    32,
    'English level 5. Mathematics level 5. Physical Science level 5.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Pretoria'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Natural and Agricultural Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Bachelor of Science in Food Management: Nutritional Science';

-- UJ
INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    30,
    'English level 5 (60%+) and Mathematics level 5 (60%+).'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Johannesburg'
JOIN Faculty f
    ON f.FacultyName = 'Art, Design and Architecture'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'B8BA3Q';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    33,
    'English level 4 (50%+) and Mathematics level 5 (60%+).'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Johannesburg'
JOIN Faculty f
    ON f.FacultyName = 'College of Business and Economics'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'B34CAQ';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    26,
    'English level 4 (50%+) and Mathematics level 4 (50%+) OR Mathematics Literacy level 5 (60%+).'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Johannesburg'
JOIN Faculty f
    ON f.FacultyName = 'College of Business and Economics'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'B34I7Q';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    32,
    'English level 5 (60%+), Mathematics level 5 (60%+), Physical Science level 5 (60%+).'
FROM Course c
JOIN University u
    ON u.UniversityName = 'University of Johannesburg'
JOIN Faculty f
    ON f.FacultyName = 'Engineering and the Built Environment'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'B6CS0Q';


-- NWU
INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    18,
    'Level 4 (50–59%) for language of tuition. Academic paper selection and best average mark.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'North-West University'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Health Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Diploma in Coaching Science';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    32,
    'Mathematics level 6.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'North-West University'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Natural and Agricultural Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Bachelor of Science in Business Analytics';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    26,
    'Mathematics level 4 OR Mathematical Literacy level 5. Afrikaans or English level 4.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'North-West University'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Economic and Management Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Bachelor of Arts in Industrial and Organisational Psychology and Labour Relations Management';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    26,
    'NSC with endorsement for bachelor''s studies and appropriate subject combinations and performance levels. Home Language and First Additional Language level 4. Additional selection and clearance requirements apply.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'North-West University'
JOIN Faculty f
    ON f.FacultyName = 'Faculty of Education'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Bachelor of Education in Early Childhood Care and Education';

-- DUT
INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    30,
    'English level 4. Mathematics level 4. Life Sciences and/or Physical Science level 4. Two additional 20-credit subjects at level 4, with not more than one language.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'Durban University of Technology'
JOIN Faculty f
    ON f.FacultyName = 'Health Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Bachelor of Health Sciences in Emergency Medical Care and Rescue';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, APSRequirement, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    28,
    'English level 4. Mathematics level 4. Life Sciences level 4. Physical Science level 4. One recognised NSC 20-credit subject.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'Durban University of Technology'
JOIN Faculty f
    ON f.FacultyName = 'Health Sciences'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseCode = 'BHRDT1';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    'English level 3. English First Additional Language level 4. Mathematics level 3 OR Mathematical Literacy level 5. Accounting level 4. Two additional 20-credit subjects at level 3.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'Durban University of Technology'
JOIN Faculty f
    ON f.FacultyName = 'Accounting & Informatics'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Diploma in Taxation';


INSERT INTO CourseOffered
    (CourseID, UniversityID, FacultyID, AdmissionRequirements)
SELECT
    c.CourseID,
    u.UniversityID,
    f.FacultyID,
    'English level 3. English First Additional Language level 4. Mathematics level 3 OR Mathematical Literacy level 4. Four additional 20-credit subjects at level 3, with not more than one language.'
FROM Course c
JOIN University u
    ON u.UniversityName = 'Durban University of Technology'
JOIN Faculty f
    ON f.FacultyName = 'Accounting & Informatics'
    AND f.UniversityID = u.UniversityID
WHERE c.CourseName = 'Diploma in Library and Information Studies';


-- =========================================================
-- CAREER
-- =========================================================

ALTER TABLE Career
ADD CONSTRAINT UQ_Career_CareerName UNIQUE (CareerName);

INSERT INTO Career (CareerName, CareerDescription)
VALUES
('Indexer', 'Organises and classifies information to make it easier to retrieve and use.'),
('Abstracter', 'Creates concise summaries or abstracts of information resources.'),
('Information Consultant', 'Provides advice and expertise on information resources, systems and services.'),
('Information Analyst', 'Analyses information and data to support decision-making and organisational needs.'),
('Information Specialist', 'Manages and provides specialised information resources and services.'),
('Librarian', 'Provides information, library and knowledge services to users.'),
('Portfolio/Fund Manager', 'Manages investment portfolios and financial assets on behalf of individuals or organisations.'),
('Investment Analyst', 'Researches and evaluates investments to support investment decisions.'),
('Risk Manager/Analyst', 'Identifies, assesses and manages financial and organisational risks.'),
('Quantitative Analyst', 'Uses mathematical and statistical methods to analyse financial markets and investments.'),
('Financial Advisor/Planner', 'Provides financial planning and investment advice to clients.'),
('Wealth Manager', 'Provides investment and financial management services to individuals and organisations.'),
('Sports Coach', 'Plans and conducts training programmes for athletes and sports participants.'),
('Information or E-Commerce Specialist', 'Works with information resources, digital services and electronic commerce systems.'),
('Information Broker', 'Connects clients with relevant information and information resources.'),
('System Specialist', 'Develops, maintains or supports information systems and related technologies.'),
('Food Industry Professional', 'Works in food-related industries including food manufacturing, research and related sectors.'),
('Project Manager', 'Plans, coordinates and manages projects to achieve defined organisational objectives.'),
('Architectural Professional', 'Designs, develops and manages building and construction projects.'),
('Chartered Accountant', 'Provides professional accounting, auditing and financial services.'),
('Human Resources Practitioner', 'Manages employee-related processes and workplace human resource activities.'),
('Civil Engineering Professional', 'Works in the design, construction and management of infrastructure.'),
('Tax Practitioner', 'Provides taxation-related services and advice to individuals or organisations.'),
('Financial Department Employee', 'Performs financial and accounting functions within an organisation.'),
('Library and Information Professional', 'Provides information organisation, retrieval, dissemination and knowledge management services.'),
('Paramedic', 'Provides emergency medical care and advanced life support before and during patient transport.'),
('Emergency Medical Services Professional', 'Provides emergency response, medical care and rescue services.'),
('Radiotherapy Radiographer', 'Plans and delivers radiation treatment to patients undergoing cancer treatment.'),
('Taxation Professional', 'Applies taxation and auditing knowledge in professional financial environments.'),
('Bookkeeper', 'Maintains financial records and performs bookkeeping activities.'),
('Accounts Clerk', 'Performs administrative and accounting tasks related to financial records.'),
('Payroll Administrator', 'Administers employee payroll and related financial records.'),
('Assistant Accountant', 'Assists with accounting, financial reporting and related financial activities.'),
('Administrative Secretary', 'Provides administrative, communication and organisational support within an office.'),
('Receptionist', 'Manages front-desk, communication and visitor-related administrative duties.'),
('Data Entry Specialist', 'Captures, maintains and manages organisational data and records.'),
('Hotel Front Desk Officer', 'Provides front-office and guest services within accommodation establishments.'),
('Assistant Chef', 'Assists with food preparation and kitchen operations.'),
('Event Planner', 'Plans, coordinates and manages events and related activities.'),
('Guest Relations Officer', 'Provides customer and guest support within hospitality environments.'),
('Public Administrator', 'Performs administrative and management functions within public-sector organisations.'),
('Municipal Officer', 'Performs administrative and operational functions within municipal government.'),
('Government Projects Assistant', 'Supports the planning and administration of government projects.'),
('Tour Operator', 'Plans and coordinates travel and tourism experiences.'),
('Travel Consultant', 'Provides advice and assistance with travel arrangements and tourism services.'),
('Game Reserve Guest Host', 'Provides guest and hospitality services within game reserves and tourism establishments.'),
('Cruise Agent', 'Assists with travel arrangements and services relating to cruise tourism.'),
('Electrician', 'Installs, maintains and repairs electrical systems and equipment.'),
('Power Plant Technician', 'Operates, maintains and supports equipment used in power generation facilities.'),
('Control and Instrumentation Technician', 'Maintains and operates control and instrumentation systems.'),
('Mechanical Fitter', 'Installs, maintains and repairs mechanical machinery and equipment.'),
('Millwright', 'Installs, maintains and repairs mechanical and electrical industrial equipment.'),
('Automotive Technician', 'Inspects, maintains and repairs motor vehicles and automotive systems.'),
('Mine Maintenance Technician', 'Maintains mechanical and industrial equipment used in mining operations.'),
('Chef', 'Prepares food and manages culinary activities in hospitality and food-service environments.'),
('Restaurant Manager', 'Manages the operations and administration of a restaurant.'),
('Catering Assistant', 'Supports food preparation and catering operations.'),
('Cruise Ship Staff', 'Provides hospitality and operational services aboard cruise ships.'),
('Agricultural Extension Officer', 'Provides agricultural advice, training and support to farmers and communities.'),
('Agribusiness Technician', 'Supports technical and operational activities within agricultural businesses.'),
('Farm Supervisor', 'Supervises agricultural production and farm operations.'),
('Welder', 'Joins and fabricates metal components using welding techniques.'),
('Boilermaker', 'Fabricates, assembles and repairs boilers, structural steel and related metalwork.'),
('Structural Steel Fabricator', 'Fabricates and assembles structural steel components.'),
('Mine Artisan', 'Performs skilled technical and maintenance work in mining environments.'),
('Shipping Agent', 'Coordinates documentation and services associated with shipping operations.'),
('Port Logistics Clerk', 'Supports logistics and administrative operations within port environments.'),
('Freight Forwarding Officer', 'Coordinates the movement and documentation of goods for transportation.'),
('HR Officer', 'Performs human resource administration and employee-support functions.'),
('Recruitment Consultant', 'Assists organisations with recruitment and candidate placement.'),
('Labour Relations Assistant', 'Supports workplace labour relations and employee relations activities.'),
('Marketing Assistant', 'Supports marketing campaigns, research and promotional activities.'),
('Sales Representative', 'Promotes and sells products or services to customers.'),
('Brand Coordinator', 'Supports the management and promotion of an organisation or product brand.'),
('Digital Marketer', 'Uses digital channels and platforms to promote products, services or organisations.'),
('Public Management Professional', 'Performs management and administrative functions within public-sector environments.'),
('Security Specialist', 'Provides security-related services and support.'),
('Metro Police Officer', 'Performs law enforcement and community safety duties within a metropolitan area.'),
('Corrections Officer', 'Works within correctional and rehabilitation environments.');


-- =========================================================
-- COURSE_CAREERS
-- =========================================================

INSERT INTO CourseCareer (CourseID, CareerID)
VALUES
-- Bachelor of Information Studies
(1, 107),
(1, 108),
(1, 109),
(1, 110),
(1, 111),
(1, 112),

-- Bachelor of Agricultural Management
(2, 165),
(2, 166),
(2, 167),

-- Bachelor of Commerce specialising in Investment Management
(21, 113),
(21, 114),
(21, 115),
(21, 116),
(21, 117),
(21, 118),

-- Higher Certificate in Sports Sciences
(22, 119),

-- Bachelor of Information Science
(23, 120),
(23, 121),
(23, 122),

-- Bachelor of Science in Food Management: Nutritional Science
(24, 123),
(24, 124),

-- Bachelor of Architecture
(25, 125),

-- Bachelor of Accounting (CA)
(26, 126),

-- Bachelor of Industrial Psychology
(27, 127),

-- Bachelor of Civil Engineering
(28, 128),

-- Bachelor of Health Sciences in Emergency Medical Care and Rescue
(33, 132),
(33, 133),

-- Bachelor of Health Sciences in Diagnostic Sonography
-- FLAG: supplied career information describes radiotherapy/radiographers
(34, 134),

-- Diploma in Taxation
(35, 129),
(35, 130),

-- Diploma in Library and Information Studies
(36, 131);


-- =========================================================
-- FUNDING
-- =========================================================

INSERT INTO Funding
(
    FundingName,
    Provider,
    FundingType,
    Description,
    Eligibility,
    Deadline,
    ApplicationURL
)
VALUES
(
    'NSFAS',
    'National Student Financial Aid Scheme',
    'Bursary',
    'Provides financial assistance to students who cannot afford their studies, including funding for tuition, accommodation, books and other study-related expenses at public universities and TVET colleges.',
    'Generally available to eligible South African students studying approved undergraduate qualifications at public universities and TVET colleges. Exclusions include students above the applicable household income threshold, students receiving full funding elsewhere, students pursuing a second undergraduate qualification, second certificate qualification, short courses, private institutions, or qualifications that are not DHET-approved and/or SAQA-accredited.',
    '2027-01-31',
    NULL
),
(
    'FASSET Bursary',
    'Finance and Accounting Services Sector Education and Training Authority (FASSET)',
    'Bursary',
    'Supports skills development and education in the finance, accounting, consulting, management and related financial services sectors.',
    'South African citizen; completed Matric in 2026; minimum overall Matric average of 75%; passed Mathematics and Accounting with top results; intending to study an eligible field; registered or accepted at a public university or university of technology in South Africa; household income not exceeding R1 million per annum.',
    '2026-02-28',
    'https://www.fasset.org.za/bursaries'
),
(
    'Zonax Group Bursary',
    'Zonax Group',
    'Bursary',
    'Provides bursary support to financially disadvantaged South African students studying engineering-related fields and aims to develop future industry professionals in engineering, mining, logistics and related sectors.',
    'South African citizen; completed Matric; studying or intending to study at Ekurhuleni East TVET College or Ekurhuleni West TVET College; studying or intending to study an Engineering qualification; minimum academic average of 60%; from a previously disadvantaged group; not receiving NSFAS or other funding.',
    '2026-01-31',
    NULL
),
(
    'Mining Qualifications Authority (MQA) Bursary',
    'Mining Qualifications Authority (MQA)',
    'Bursary',
    'Provides bursary support for selected university, university of technology and TVET qualifications aligned with skills development needs in the South African mining and minerals sector.',
    'South African citizen; currently in or completed Matric; studying or intending to study an eligible undergraduate qualification; studying or intending to study at a public university, university of technology or TVET college; unemployed and remaining unemployed during studies; household income not exceeding R600,000 per annum. Preference may be given to historically disadvantaged individuals, females, persons with disabilities, rural students and applicants with strong academic records.',
    '2025-07-31',
    NULL
),
(
    'Polokwane Municipality Bursary',
    'Polokwane Local Municipality',
    'Bursary',
    'Provides bursary funding for students pursuing a first degree or National Diploma in any field.',
    'South African citizen; permanent resident of Polokwane Municipality in Limpopo; currently in or completed Matric; studying or intending to study a first degree or National Diploma in 2026; studying or intending to study at a public university, university of technology or TVET college; not receiving another bursary; from a disadvantaged background.',
    '2026-12-05',
    NULL
),
(
    'Greater Letaba Municipality Bursary',
    'Greater Letaba Municipality',
    'Bursary',
    'Provides bursary support to eligible students from Greater Letaba Municipality studying selected fields including Agriculture, Engineering and Built Environment, Finance, Information Technology and Tourism.',
    'Permanent resident of Greater Letaba Municipality; completed Grade 12 or passed the current tertiary year; from a disadvantaged household background; has an acceptance letter from a registered public tertiary institution or TVET college.',
    '2026-01-30',
    NULL
),
(
    'KwaZulu-Natal Provincial Government Bursary',
    'KwaZulu-Natal Provincial Government',
    'Bursary',
    'Provides bursary funding for selected undergraduate fields aligned with the skills requirements of KwaZulu-Natal provincial government departments.',
    'Aged 18 to 35; resident of KwaZulu-Natal; completed Matric; studying or intending to study full-time towards an eligible undergraduate qualification in 2026; studying or accepted/provisionally accepted at a recognised public tertiary institution in South Africa. Preference may be given to students studying in KwaZulu-Natal. Youth with disabilities are encouraged to apply.',
    '2027-02-15',
    NULL
),
(
    'KwaDukuza Municipality Bursary',
    'KwaDukuza Local Municipality',
    'Bursary',
    'Provides bursary funding for eligible students from the KwaDukuza municipal area studying selected fields including Built Environment, Commerce, Environmental Management, Library Science, Legal Studies and Community and Economic Development.',
    'Resident of KwaDukuza municipal area in KwaZulu-Natal; completed Matric; achieved university entrance or endorsement; studying or intending to study full-time towards an undergraduate National Diploma or Degree in an eligible field; studying or intending to study at a recognised accredited public tertiary institution; not receiving another bursary or NSFAS funding; no previous qualification at the same level; strong academic record; financial need; previously disadvantaged background.',
    '2027-01-23',
    NULL
),
(
    'KZN COGTA Bursary',
    'KwaZulu-Natal Department of Cooperative Governance and Traditional Affairs',
    'Bursary',
    'Provides bursary funding for selected fields related to local government, governance, infrastructure, technology, planning and public administration.',
    'South African citizen; resident of KwaZulu-Natal; aged 18 to 35; completed Matric; studying or intending to study full-time towards a National Diploma or Bachelor''s Degree in an eligible field; studying or accepted/provisionally accepted at a public tertiary institution in KwaZulu-Natal. Studies outside KwaZulu-Natal may be considered where the qualification is unavailable locally or the applicant was not accepted locally. Candidates with disabilities are encouraged to apply.',
    '2027-01-31',
    NULL
),
(
    'KwaZulu-Natal Department of Health Bursary',
    'KwaZulu-Natal Department of Health',
    'Bursary',
    'Provides funding for professional nurses employed by the KwaZulu-Natal Department of Health who intend to undertake approved nursing specialty studies.',
    'Must be permanently employed as a Professional Nurse by the KwaZulu-Natal Department of Health with probation confirmed; must hold an eligible nursing qualification; must be registered with the South African Nursing Council as a Professional Nurse and Midwife or General Nurse with a Midwifery qualification; minimum of 2 years verifiable current clinical experience in the specialty; must intend to study full-time for at least one year at a higher education institution or college of nursing in South Africa offering the specialty.',
    NULL,
    NULL
);


-- =========================================================
-- UNIVERSITY_FUNDING
-- =========================================================

-- NSFAS
-- Covers public universities and TVET colleges
INSERT INTO UniversityFunding (UniversityID, FundingID)
VALUES
(1, 1),   -- University of Limpopo
(2, 1),   -- University of Venda
(3, 1),   -- University of KwaZulu-Natal
(4, 1),   -- Durban University of Technology
(5, 1),   -- Mangosuthu University of Technology
(6, 1),   -- University of Zululand
(7, 1),   -- University of South Africa
(8, 1),   -- University of Pretoria
(9, 1),   -- University of Johannesburg
(10, 1),  -- North-West University
(11, 1),  -- Capricorn TVET College
(12, 1),  -- Lephalale TVET College
(13, 1),  -- Letaba TVET College
(14, 1),  -- Mopani South East TVET College
(15, 1),  -- Sekhukhune TVET College
(16, 1),  -- Vhembe TVET College
(17, 1),  -- Waterberg TVET College
(18, 1),  -- Coastal TVET College
(19, 1),  -- Elangeni TVET College
(20, 1),  -- Esayidi TVET College
(21, 1),  -- Majuba TVET College
(22, 1),  -- Mnambithi TVET College
(23, 1),  -- Mthashana TVET College
(24, 1),  -- Thekwini TVET College
(25, 1),  -- Umfolozi TVET College
(26, 1),  -- Umgungundlovu TVET College
(27, 1);  -- Gert Sibande TVET College


-- FASSET Bursary
-- Public universities / universities of technology,
-- where the listed fields may apply
INSERT INTO UniversityFunding (UniversityID, FundingID)
VALUES
(1, 2),   -- University of Limpopo
(2, 2),   -- University of Venda
(3, 2),   -- University of KwaZulu-Natal
(4, 2),   -- Durban University of Technology
(5, 2),   -- Mangosuthu University of Technology
(6, 2),   -- University of Zululand
(7, 2),   -- University of South Africa
(8, 2),   -- University of Pretoria
(9, 2),   -- University of Johannesburg
(10, 2);  -- North-West University


-- Zonax Group Bursary
-- Specifically Ekurhuleni East and Ekurhuleni West TVET Colleges.
-- Neither is currently in the University table.
-- Therefore NO University_Funding record can be created yet.


-- MQA Bursary
-- Public universities, universities of technology and TVET colleges
-- where the relevant mining/engineering fields are available.
INSERT INTO UniversityFunding (UniversityID, FundingID)
VALUES
(3, 4),   -- University of KwaZulu-Natal
(4, 4),   -- Durban University of Technology
(5, 4),   -- Mangosuthu University of Technology
(6, 4),   -- University of Zululand
(8, 4),   -- University of Pretoria
(9, 4),   -- University of Johannesburg
(10, 4),  -- North-West University
(11, 4),  -- Capricorn TVET College
(12, 4),  -- Lephalale TVET College
(13, 4),  -- Letaba TVET College
(14, 4),  -- Mopani South East TVET College
(15, 4),  -- Sekhukhune TVET College
(16, 4),  -- Vhembe TVET College
(17, 4),  -- Waterberg TVET College
(18, 4),  -- Coastal TVET College
(19, 4),  -- Elangeni TVET College
(20, 4),  -- Esayidi TVET College
(21, 4),  -- Majuba TVET College
(22, 4),  -- Mnambithi TVET College
(23, 4),  -- Mthashana TVET College
(24, 4),  -- Thekwini TVET College
(25, 4),  -- Umfolozi TVET College
(26, 4),  -- Umgungundlovu TVET College
(27, 4);  -- Gert Sibande TVET College


-- Polokwane Municipality Bursary
-- Available to students residing in Polokwane Municipality.
-- Institution is not restricted to one university.
-- Can apply at public university, university of technology or TVET college.
INSERT INTO UniversityFunding (UniversityID, FundingID)
VALUES
(1, 5),   -- University of Limpopo
(2, 5),   -- University of Venda
(3, 5),   -- University of KwaZulu-Natal
(4, 5),   -- Durban University of Technology
(5, 5),   -- Mangosuthu University of Technology
(6, 5),   -- University of Zululand
(7, 5),   -- University of South Africa
(8, 5),   -- University of Pretoria
(9, 5),   -- University of Johannesburg
(10, 5),  -- North-West University
(11, 5),  -- Capricorn TVET College
(12, 5),  -- Lephalale TVET College
(13, 5),  -- Letaba TVET College
(14, 5),  -- Mopani South East TVET College
(15, 5),  -- Sekhukhune TVET College
(16, 5),  -- Vhembe TVET College
(17, 5),  -- Waterberg TVET College
(18, 5),  -- Coastal TVET College
(19, 5),  -- Elangeni TVET College
(20, 5),  -- Esayidi TVET College
(21, 5),  -- Majuba TVET College
(22, 5),  -- Mnambithi TVET College
(23, 5),  -- Mthashana TVET College
(24, 5),  -- Thekwini TVET College
(25, 5),  -- Umfolozi TVET College
(26, 5),  -- Umgungundlovu TVET College
(27, 5);  -- Gert Sibande TVET College


-- Greater Letaba Municipality Bursary
-- Public tertiary institutions / TVET colleges.
INSERT INTO UniversityFunding (UniversityID, FundingID)
VALUES
(1, 6),   -- University of Limpopo
(2, 6),   -- University of Venda
(3, 6),   -- University of KwaZulu-Natal
(4, 6),   -- Durban University of Technology
(5, 6),   -- Mangosuthu University of Technology
(6, 6),   -- University of Zululand
(7, 6),   -- University of South Africa
(8, 6),   -- University of Pretoria
(9, 6),   -- University of Johannesburg
(10, 6),  -- North-West University
(11, 6),  -- Capricorn TVET College
(12, 6),  -- Lephalale TVET College
(13, 6),  -- Letaba TVET College
(14, 6),  -- Mopani South East TVET College
(15, 6),  -- Sekhukhune TVET College
(16, 6),  -- Vhembe TVET College
(17, 6),  -- Waterberg TVET College
(18, 6),  -- Coastal TVET College
(19, 6),  -- Elangeni TVET College
(20, 6),  -- Esayidi TVET College
(21, 6),  -- Majuba TVET College
(22, 6),  -- Mnambithi TVET College
(23, 6),  -- Mthashana TVET College
(24, 6),  -- Thekwini TVET College
(25, 6),  -- Umfolozi TVET College
(26, 6),  -- Umgungundlovu TVET College
(27, 6);  -- Gert Sibande TVET College


-- KwaZulu-Natal Provincial Government Bursary
-- Relevant institutions in KwaZulu-Natal
INSERT INTO UniversityFunding (UniversityID, FundingID)
VALUES
(3, 7),   -- University of KwaZulu-Natal
(4, 7),   -- Durban University of Technology
(5, 7),   -- Mangosuthu University of Technology
(6, 7),   -- University of Zululand
(18, 7),  -- Coastal TVET College
(19, 7),  -- Elangeni TVET College
(20, 7),  -- Esayidi TVET College
(21, 7),  -- Majuba TVET College
(22, 7),  -- Mnambithi TVET College
(23, 7),  -- Mthashana TVET College
(24, 7),  -- Thekwini TVET College
(25, 7),  -- Umfolozi TVET College
(26, 7);  -- Umgungundlovu TVET College


-- KwaDukuza Municipality Bursary
-- Public tertiary institutions; applicant must reside in KwaDukuza.
INSERT INTO UniversityFunding (UniversityID, FundingID)
VALUES
(3, 8),   -- University of KwaZulu-Natal
(4, 8),   -- Durban University of Technology
(5, 8),   -- Mangosuthu University of Technology
(6, 8),   -- University of Zululand
(18, 8),  -- Coastal TVET College
(19, 8),  -- Elangeni TVET College
(20, 8),  -- Esayidi TVET College
(21, 8),  -- Majuba TVET College
(22, 8),  -- Mnambithi TVET College
(23, 8),  -- Mthashana TVET College
(24, 8),  -- Thekwini TVET College
(25, 8),  -- Umfolozi TVET College
(26, 8);  -- Umgungundlovu TVET College


-- KZN COGTA Bursary
-- Primarily public tertiary institutions in KZN,
-- with possible exceptions if the qualification isn't available in KZN.
INSERT INTO UniversityFunding (UniversityID, FundingID)
VALUES
(3, 9),   -- University of KwaZulu-Natal
(4, 9),   -- Durban University of Technology
(5, 9),   -- Mangosuthu University of Technology
(6, 9),   -- University of Zululand
(18, 9),  -- Coastal TVET College
(19, 9),  -- Elangeni TVET College
(20, 9),  -- Esayidi TVET College
(21, 9),  -- Majuba TVET College
(22, 9),  -- Mnambithi TVET College
(23, 9),  -- Mthashana TVET College
(24, 9),  -- Thekwini TVET College
(25, 9),  -- Umfolozi TVET College
(26, 9);  -- Umgungundlovu TVET College

-- =========================================================
-- IMPORTANT DATE
-- =========================================================

INSERT INTO ImportantDate
    (UniversityID, Title, Description, Date, DateType, URL)
VALUES
-- University of Limpopo / Limpopo-related funding
(1,
 'Polokwane Municipality Bursary Closing Date',
 'Closing date for the Polokwane Municipality Bursary.',
 '2026-12-05',
 'Funding Deadline',
 NULL),

(1,
 'Greater Letaba Municipality Bursary Closing Date',
 'Closing date for the Greater Letaba Municipality Bursary.',
 '2026-01-30',
 'Funding Deadline',
 NULL),

-- University of KwaZulu-Natal / KZN funding
(3,
 'KZN Provincial Government Bursary Closing Date',
 'Closing date for the KwaZulu-Natal Provincial Government Bursary.',
 '2027-02-15',
 'Funding Deadline',
 NULL),

(3,
 'KwaDukuza Municipality Bursary Closing Date',
 'Closing date for the KwaDukuza Municipality Bursary.',
 '2027-01-23',
 'Funding Deadline',
 NULL),

(3,
 'KZN COGTA Bursary Closing Date',
 'Closing date for the KwaZulu-Natal Department of Cooperative Governance and Traditional Affairs Bursary.',
 '2027-01-31',
 'Funding Deadline',
 NULL),

(3,
 'KZN Department of Health Bursary',
 'Typical closing period for the KwaZulu-Natal Department of Health Nursing Specialty Bursary.',
 '2026-11-30',
 'Funding Deadline',
 NULL);

 -- =========================================================
-- DOCUMENT
-- =========================================================

INSERT INTO Document (DocumentName, Description, DocumentType)
VALUES
('South African ID', 
 'Copy of the applicant''s South African identity document or smart ID.', 
 'Personal'),

('Passport', 
 'Copy of a valid passport, where applicable.', 
 'Personal'),

('Birth Certificate', 
 'Birth certificate or other acceptable proof of identity, where required.', 
 'Personal'),

('Matric Certificate', 
 'Certified copy of the applicant''s National Senior Certificate or equivalent school-leaving certificate.', 
 'Academic'),

('Latest School Results', 
 'Most recent Grade 11 or Grade 12 academic results, where required.', 
 'Academic'),

('Academic Transcript', 
 'Official academic record or transcript for students who have previously studied at a tertiary institution.', 
 'Academic'),

('Proof of Registration', 
 'Official proof that the applicant is registered at a tertiary institution.', 
 'University'),

('Acceptance Letter', 
 'Official acceptance or provisional acceptance letter from the tertiary institution.', 
 'University'),

('Proof of Residence', 
 'Recent document confirming the applicant''s residential address.', 
 'Personal'),

('Proof of Household Income', 
 'Documents showing household income, such as payslips or other acceptable proof of income.', 
 'Financial'),

('Parent/Guardian ID', 
 'Copy of the identity document of a parent or legal guardian, where required.', 
 'Financial'),

('Parent/Guardian Proof of Income', 
 'Proof of income for a parent or guardian, where required for financial assessment.', 
 'Financial'),

('Affidavit', 
 'A sworn affidavit confirming information where formal supporting documentation is unavailable or required.', 
 'Supporting'),

('Disability Documentation', 
 'Supporting documentation confirming a disability, where applicable.', 
 'Supporting'),

('Proof of Unemployment', 
 'Documentation confirming unemployment status, where required by a funding provider.', 
 'Financial'),

('Bank Confirmation Letter', 
 'Official bank confirmation document for the applicant''s bank account, where required.', 
 'Financial'),

('Proof of Funding Status', 
 'Documentation confirming whether the applicant is receiving other bursary or financial funding.', 
 'Financial'),

('Bursary Application Form', 
 'Completed application form required by the relevant bursary or funding provider.', 
 'Funding'),

('Proof of Application', 
 'Confirmation that the applicant has submitted an application to a university, college, or qualification.', 
 'University'),

('Certified Copies of Documents', 
 'Certified copies of required supporting documents, where certification is required.', 
 'Supporting');



-- =========================================================
-- Sanity Check
-- =========================================================

SELECT *
FROM University;

SELECT
    UniversityName,
    Abbreviation,
    InstitutionType,
    Province
FROM University
ORDER BY InstitutionType, UniversityName;

SELECT *
FROM Faculty;

SELECT *
FROM Course;

SELECT CourseID, CourseName
FROM Course
ORDER BY CourseID;

SELECT *
FROM CourseOffered;

SELECT *
FROM Career;

SELECT *
FROM CourseCareer;

SELECT *
FROM Funding;

SELECT *
FROM UniversityFunding;

SELECT *
FROM ImportantDate;

SELECT *
FROM Document;