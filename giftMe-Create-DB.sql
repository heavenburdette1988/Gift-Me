USE [master]

IF db_id('GiftMeApp') IS NULl
  CREATE DATABASE [GiftMeApp]
GO

USE [GiftMeApp]
GO


DROP TABLE IF EXISTS [Gifts];
DROP TABLE IF EXISTS [Friends];
DROP TABLE IF EXISTS [Users];
DROP TABLE IF EXISTS [Types];
DROP TABLE IF EXISTS [Events];
DROP TABLE IF EXISTS [Lists];
GO


CREATE TABLE [Types] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Name] nvarchar(20) NOT NULL
)

CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY IDENTITY,
  [DisplayName] nvarchar(50) NOT NULL,
  [FirstName] nvarchar(50) NOT NULL,
  [LastName] nvarchar(50) NOT NULL,
  [Email] nvarchar(555) NOT NULL,
  [CreateDateTime] datetime NOT NULL,
  [ImageLocation] nvarchar,
  [About] nvarchar(1000),
  [DateOfBirth] datetime NOT NULL,


  
)

CREATE TABLE [Gifts] (
  [Id] integer PRIMARY KEY IDENTITY,
  [UserId] integer NOT NULL,
  [ItemReceived] nvarchar NOT NULL,
  [TypeId] datetime NOT NULL,
  [Title] nvarchar(255),
  [Url] nvarchar,
  [ImageLocation] nvarchar,
  [Notes] nvarchar,
  [Quantity] int,



  CONSTRAINT [FK_Gifts_UserProfile_UserID] FOREIGN KEY ([UserId])
	REFERENCES [UserProfile] ([Id]),

 
)

CREATE TABLE [Friends] (
  [Id] integer PRIMARY KEY IDENTITY,
  [ProfileUserID] int NOT NULL,
  [SubscriberUserId] int NOT NULL,
  [BeginDateTime] datetime NOT NULL,
  [EndDateTime] datetime,

CONSTRAINT [FK_Friends_UserProfile_ProfileId] FOREIGN KEY ([ProfileUserId])
	REFERENCES [UserProfile] ([Id]),
	
    CONSTRAINT [FK_Friends_UserProfile_SubscriberUserId] FOREIGN KEY ([SubscriberUserId])
	REFERENCES [UserProfile] ([Id]),

)

CREATE TABLE [Events] (
  [Id] integer PRIMARY KEY IDENTITY,
  [Title] nvarchar(255) NOT NULL,
  [content] text NOT NULL,
  [ImageLocation] nvarchar(255),
  [EventDate] datetime NOT NULL,
  [PublishDateTime] datetime,
  [TypeId] integer NOT NULL,
  [UserProfileId] integer NOT NULL,

  CONSTRAINT [FK_Events_TypeId] FOREIGN KEY ([TypeId]) REFERENCES [Types] ([Id]),
  CONSTRAINT [FK_Events_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)

CREATE TABLE [List] (
  [Id] integer PRIMARY KEY IDENTITY,
  [GiftId] integer NOT NULL,
  [TypeId] integer NOT NULL,
  [Title] nvarchar(255) NOT NULL,
  [CreateDateTime] datetime NOT NULL,

  CONSTRAINT [FK_List_Gifts] FOREIGN KEY ([GiftId]) REFERENCES [Gifts] ([Id]),
  CONSTRAINT [FK_List_Types] FOREIGN KEY ([TypeId]) REFERENCES [Types] ([Id])
)
GO