alter table public.events
add column venue_name varchar(160);

comment on column public.events.venue_name is 'Nome do local onde o evento acontece.';
