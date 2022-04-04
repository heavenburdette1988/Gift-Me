USE [GiftMe];
GO

set identity_insert [UserProfile] on
insert into [UserProfile] ([ID], [FirstName], [LastName], [DisplayName],[Email], [CreateDateTime], [ImageLocation], [About], [DateOfBirth]) VALUES (1, 'Heaven', 'Burdette', 'HeavenB', 'Heaven@me.com','2022-02-15','https://images.unsplash.com/photo-1611611158876-41699b77a059?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80','Favorite Color-Gray, Favorite Dog- Bulldog','1-22-88'), (2, 'Matt', 'Burdette', 'MattB', 'Matt@me.com','2021-03-5','https://images.unsplash.com/photo-1570314032164-6a08c8fa63d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80','Favorite Color-Silver, Favorite Dog- Bulldog','2-23-88');
set identity_insert [UserProfile] off

set identity_insert [Gifts] on
insert into [Gifts] ([Id], [UserId], [ItemReceived], [TypeId], [Title], [Url], [ImageLocation], [Notes],[Quantity])
values (1, 1, 'false', 1, 'LongSon', 'https://www.etsy.com/listing/994670862/advanced-long-furby-listing-you-want?click_key=e1efc5af91d23fc4bcc5f7b30a5f0eb2e727a0da%3A994670862&click_sum=b1953ba6&ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=furby&ref=sr_gallery-1-3&organic_search_click=1', 'https://i.etsystatic.com/7863475/r/il/705617/3594168520/il_794xN.3594168520_hnpf.jpg', 'Furby Long Son', 1 )
set identity_insert [Gifts] off

set identity_insert [Types] on
insert into [Types] ([Id], [Name])
values (1, 'Public'), (2, 'Private')
set identity_insert [Types] off

set identity_insert [Friends] on
insert into [Friends] ([Id], [ProfileUserId], [SubscriberUserId], [BeginDateTime], [EndDateTime])
values (1, 1, 2, '2022-4-1', Null), (2, 2, 1, '2022-4-1', Null)
set identity_insert [Types] off

set identity_insert [Events] on
insert into [Events] ([Id], [Title],[Content], [ImageLocation], [EventDate], [PublishDateTime], [TypeId], [UserProfileId])
values (1, 'Christmas Party', 'Christmas Party at my House', '2022-12-25', '2022-04-01', 1, 1), 
set identity_insert [Events] off

set identity_insert [Lists] on
insert into [Lists] ([Id], [GiftId],[TypeId], [Title], [CreationDate]
values (1, 1, 1, 'Furby', '2022-04-04'), 
set identity_insert [Lists] off

