CREATE TABLE `cheers` (
	`id` text PRIMARY KEY NOT NULL,
	`prefecture` text NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`updated_at` integer
);
