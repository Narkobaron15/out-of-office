begin;

alter table if exists projects
drop constraint FK_projects_manager;

alter table if exists approval_requests
drop constraint FK_approval_requests_approver;

alter table if exists approval_requests
drop constraint FK_approval_requests_leave_requests;

alter table if exists leave_requests
drop constraint FK_users_leave_requests;

alter table if exists users
drop constraint fk_users_partner;

drop table if exists projects;
drop table if exists approval_requests;
drop table if exists leave_requests;
drop table if exists users;

commit;

begin;

create table users (
	id uuid primary key default gen_random_uuid(),
	full_name text not null,
	subdivision varchar(100) not null,
	position varchar(100) not null,
	status bit not null,
	days_off bigint not null,
	picture varchar(1000),
	partner_id uuid,
	
	created_at timestamp not null,
	updated_at timestamp,
	
	constraint fk_users_partner
	foreign key(partner_id)
	references users(id)
);

create table leave_requests(
	id uuid primary key default gen_random_uuid(),
	employee_id uuid not null,
	absence_reason varchar(100) not null,
	"start" date not null,
	"end" date not null,
	comment text,
	status varchar(100) not null,
	
	created_at timestamp not null,
	updated_at timestamp,
	
	constraint FK_users_leave_requests
	foreign key(employee_id)
	references users(id)
	on delete cascade
);

create table approval_requests(
	id uuid primary key default gen_random_uuid(),
	approver_id uuid not null,
	leave_request_id uuid not null,
	status varchar(100) not null,
	
	created_at timestamp not null,
	updated_at timestamp,
	
	constraint FK_approval_requests_approver
	foreign key(approver_id)
	references users(id)
	on delete cascade,
	
	constraint FK_approval_requests_leave_requests
	foreign key(leave_request_id)
	references leave_requests(id)
	on delete cascade
);

create table projects(
	id uuid primary key default gen_random_uuid(),
	name varchar(180) not null,
	"type" varchar(100) not null,
	"start" date not null,
	"end" date not null,
	manager_id uuid not null,
	comment text,
	status bit not null,
	
	created_at timestamp not null,
	updated_at timestamp,
	
	constraint FK_projects_manager
	foreign key(manager_id)
	references users(id)
	on delete cascade
);

commit;
