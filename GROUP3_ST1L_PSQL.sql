CREATE TYPE usrtype AS ENUM('student','teacher');

CREATE TABLE ACCOUNT(
	userid integer NOT NULL,
	username VARCHAR(20) NOT NULL,
	password VARCHAR(20) NOT NULL,
	type usrtype,
	CONSTRAINT ACCOUNT_userid_pk PRIMARY KEY(userid),
	CONSTRAINT ACCOUNT_userid_uk UNIQUE(userid),
	CONSTRAINT ACCOUNT_username_uk UNIQUE(username)
);

CREATE SEQUENCE account_userid_seq;
ALTER TABLE ACCOUNT ALTER userid SET DEFAULT NEXTVAL('account_userid_seq');

CREATE TABLE STUDENT AS (SELECT * FROM ACCOUNT);
ALTER TABLE STUDENT ADD studNo varchar(10) ;
ALTER TABLE STUDENT ADD name varchar(50);
ALTER TABLE STUDENT ADD CONSTRAINT STUDENT_studno_pk PRIMARY KEY(studNo);

CREATE TABLE TEACHER AS (SELECT * FROM ACCOUNT);
ALTER TABLE TEACHER ADD employeeno varchar(10);
ALTER TABLE TEACHER ADD name varchar(50);
ALTER TABLE TEACHER ADD CONSTRAINT TEACHER_employeeno_pk PRIMARY KEY(employeeno);
ALTER TABLE TEACHER ADD CONSTRAINT TEACHER_employeeno_uk UNIQUE(employeeno);

CREATE TABLE CLASS(
	courseCode VARCHAR(5) NOT NULL,
	courseTitle VARCHAR(50) NOT NULL,
	section VARCHAR(5),
	userid VARCHAR(10) NOT NULL,
	empno VARCHAR(10) NOT NULL REFERENCES TEACHER(employeeno),
	CONSTRAINT CLASS_courseCode_pk PRIMARY KEY(courseCode),
	CONSTRAINT CLASS_courseTitle_uk UNIQUE(courseCode) 
);


CREATE TABLE REQUIREMENT(
	reqid VARCHAR(5) NOT NULL,
	topic VARCHAR(40) NOT NULL,
	type VARCHAR(10),
	dateissu DATE,
	datesub DATE,
	grade DECIMAL(3,2),
	empno VARCHAR(10) REFERENCES TEACHER(employeeno),
	courseCode VARCHAR(5),
	CONSTRAINT REQUIREMENT_reqid_pk PRIMARY KEY(reqid),
	CONSTRAINT REQUIREMENT_courseCode_fk FOREIGN KEY(courseCode) REFERENCES CLASS(courseCode)
);

CREATE TABLE FILE(
	courseCode VARCHAR(5),
	topic varchar(50),
	dateiss DATE,
	type VARCHAR(10),
	CONSTRAINT FILE_courseCode_pk PRIMARY KEY(courseCode),
	CONSTRAINT FILE_topic_uk UNIQUE(topic)
);

CREATE TABLE EMAIL(
	id integer NOT NULL,
	userid integer NOT NULL,
	email VARCHAR(50) NOT NULL,
	CONSTRAINT EMAIL_id_pk PRIMARY KEY(id),
	CONSTRAINT EMAIL_userid_fk FOREIGN KEY(userid) REFERENCES ACCOUNT(userid),
	CONSTRAINT EMAIL_email_uk  UNIQUE(email)
);
CREATE SEQUENCE email_id_seq;
ALTER TABLE EMAIL ALTER id SET DEFAULT NEXTVAL('email_id_seq');


CREATE TABLE CONTACT(
	id integer NOT NULL,
	userid integer NOT NULL,
	connum VARCHAR(50) NOT NULL,
	CONSTRAINT CONTACT_id_pk PRIMARY KEY(id),
	CONSTRAINT CONTACT_userid_fk FOREIGN KEY(userid) REFERENCES ACCOUNT(userid),
	CONSTRAINT CONTACT_connum_uk UNIQUE(connum)
);

CREATE SEQUENCE contact_id_seq;
ALTER TABLE CONTACT ALTER id SET DEFAULT NEXTVAL('contact_id_seq');


CREATE TABLE STUDENTS_ENROLLED(
	id SERIAL,
	Studnum VARCHAR(10),
	courseCode VARCHAR(5),
	CONSTRAINT STUDENTS_ENROLLED_Studnum_pk PRIMARY KEY(id),
	CONSTRAINT STUDENTS_ENROLLED_Studnum_fk FOREIGN KEY(Studnum) REFERENCES STUDENT(studNo),
	CONSTRAINT STUDENT_ENROLLED_courseCode_fk FOREIGN KEY(courseCode) REFERENCES CLASS(courseCode)
);

CREATE SEQUENCE studEnrolled_id_seq;
ALTER TABLE students_enrolled ALTER id SET DEFAULT NEXTVAL('studEnrolled_id_seq');

INSERT INTO ACCOUNT VALUES
(
	'6969','kekgod','kek','student'
);

INSERT INTO ACCOUNT VALUES
(
	'6967','keklord','kek','teacher'
);

INSERT INTO ACCOUNT VALUES
(
	'9382','kekguru','kek','student'
);
-----------------------------------------------------------
INSERT INTO STUDENT VALUES
(
	'9382','kekguru','kek','student','2013-06969','ijsdfyk kasdjn'
);
INSERT INTO STUDENT VALUES
(
	'9322','kekdude','kek','student','2013-06961','ijsdfyk kasdjn'
);
INSERT INTO STUDENT VALUES
(
	'9381','kekduke','kek','student','2013-16969','ijsdfyk kasdjn'
);
-------------------------------------------------
INSERT INTO TEACHER VALUES
(
	'9382','kekguru','kek','teacher','2013-06969','ijsdfyk kasdjn'
);
INSERT INTO TEACHER VALUES
(
	'9322','kekdude','kek','teacher','2013-06961','ijsdfyk kasdjn'
);
INSERT INTO TEACHER VALUES
(
	'9381','kekduke','kek','teacher','2013-16969','ijsdfyk kasdjn'
);
-------------------------------------------
INSERT INTO CLASS VALUES
(
	'kek1','THE SECRETS OF KEK','k-2','9381','2013-16969'
);

INSERT INTO CLASS VALUES
(
	'kek2','THE SECRETS OF KEK','k-2','9381','2013-16969'
);

INSERT INTO CLASS VALUES
(
	'kek3','THE SECRETS OF KEK','k-2','9381','2013-16969'
);
----------------------------------
INSERT INTO REQUIREMENT VALUES
(
	'a13s','THE SECRETS OF KEK','pdf',current_timestamp,current_timestamp,2,'2013-16969'
);

INSERT INTO REQUIREMENT VALUES
(
	'a12s','THE SECRETS OF KEK','pdf',current_timestamp,current_timestamp,2,'2013-16969'
);

INSERT INTO REQUIREMENT VALUES
(
	'a11s','THE SECRETS OF KEK','pdf',current_timestamp,current_timestamp,2,'2013-16969'
);

---------------------------------------

INSERT INTO FILE VALUES
(
	'dsi','THE DEATH OF KEKS',current_timestamp,'pdf'
);

INSERT INTO FILE VALUES
(
	'dsi1','THE DEATH OF KEKS2',to_date('01-01-1111','DD-MM-YYYY'),'docx'
);

INSERT INTO FILE VALUES
(
	'dsi2','THE DEATH OF KEKS3',to_date('01-03-1111','DD-MM-YYYY'),'olcx'
);
-----------------------------------------------------------------
INSERT INTO EMAIL VALUES
(
	'da8su',';ijhnm,'
);
INSERT INTO EMAIL VALUES
(
	'dmwhn',';ijnm,'
);
INSERT INTO EMAIL VALUES
(
	'dak3ujn',';ijhn,'
);
------------------------------------------------
INSERT INTO CONTACT VALUES
(
	'mkjdsb','jndju2js'
);

INSERT INTO CONTACT VALUES
(
	'kjdsb','jndu2js'
);

INSERT INTO CONTACT VALUES
(
	'mjdsb','jdju2js'
);

