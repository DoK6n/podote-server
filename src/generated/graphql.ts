import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type CreateTodoInput = {
  content?: InputMaybe<Scalars['JSON']>;
};

export type CreateUserInput = {
  createDt: Scalars['DateTime'];
  email: Scalars['String'];
  name: Scalars['String'];
  snsTypeName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewTodo?: Maybe<Todo>;
  addUser: User;
  deleteAllRemovedTodos?: Maybe<Array<Todo>>;
  deleteRemovedTodo?: Maybe<Todo>;
  editTodoContent?: Maybe<Todo>;
  editTodoDone?: Maybe<Todo>;
  recycleRemovedTodo?: Maybe<Todo>;
  removeTodo?: Maybe<Todo>;
};


export type MutationAddNewTodoArgs = {
  data: CreateTodoInput;
};


export type MutationAddUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteRemovedTodoArgs = {
  id: Scalars['String'];
};


export type MutationEditTodoContentArgs = {
  data: UpdateTodoContentInput;
};


export type MutationEditTodoDoneArgs = {
  data: UpdateTodoDoneInput;
};


export type MutationRecycleRemovedTodoArgs = {
  id: Scalars['String'];
};


export type MutationRemoveTodoArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  retrieveAllRemovedTodo?: Maybe<Array<Todo>>;
  retrieveAllTodos?: Maybe<Array<Todo>>;
  retrieveAllUsers?: Maybe<Array<User>>;
  retrieveRemovedTodo?: Maybe<Todo>;
  retrieveTodo?: Maybe<Todo>;
  retrieveUserById: UserWithSnsType;
  snsType: SnsType;
};


export type QueryRetrieveRemovedTodoArgs = {
  id: Scalars['String'];
};


export type QueryRetrieveTodoArgs = {
  id: Scalars['String'];
};


export type QuerySnsTypeArgs = {
  name: Scalars['String'];
};

export type SnsType = {
  __typename?: 'SnsType';
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Todo = {
  __typename?: 'Todo';
  content?: Maybe<Scalars['JSON']>;
  createdDt: Scalars['DateTime'];
  done: Scalars['Boolean'];
  id: Scalars['String'];
  isRemoved: Scalars['Boolean'];
  orderKey: Scalars['Float'];
  removedDt?: Maybe<Scalars['DateTime']>;
  updatedDt?: Maybe<Scalars['DateTime']>;
  user: User;
  userId: Scalars['String'];
};

export type UpdateTodoContentInput = {
  content?: InputMaybe<Scalars['JSON']>;
  id: Scalars['String'];
};

export type UpdateTodoDoneInput = {
  done: Scalars['Boolean'];
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  snsTypeId: Scalars['Float'];
};

export type UserWithSnsType = {
  __typename?: 'UserWithSnsType';
  email: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  snsType: Scalars['String'];
  snsTypeId: Scalars['Float'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateTodoInput: CreateTodoInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SnsType: ResolverTypeWrapper<SnsType>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Todo: ResolverTypeWrapper<Todo>;
  UpdateTodoContentInput: UpdateTodoContentInput;
  UpdateTodoDoneInput: UpdateTodoDoneInput;
  User: ResolverTypeWrapper<User>;
  UserWithSnsType: ResolverTypeWrapper<UserWithSnsType>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateTodoInput: CreateTodoInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime'];
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  JSON: Scalars['JSON'];
  Mutation: {};
  Query: {};
  SnsType: SnsType;
  String: Scalars['String'];
  Todo: Todo;
  UpdateTodoContentInput: UpdateTodoContentInput;
  UpdateTodoDoneInput: UpdateTodoDoneInput;
  User: User;
  UserWithSnsType: UserWithSnsType;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addNewTodo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<MutationAddNewTodoArgs, 'data'>>;
  addUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAddUserArgs, 'data'>>;
  deleteAllRemovedTodos?: Resolver<Maybe<Array<ResolversTypes['Todo']>>, ParentType, ContextType>;
  deleteRemovedTodo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<MutationDeleteRemovedTodoArgs, 'id'>>;
  editTodoContent?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<MutationEditTodoContentArgs, 'data'>>;
  editTodoDone?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<MutationEditTodoDoneArgs, 'data'>>;
  recycleRemovedTodo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<MutationRecycleRemovedTodoArgs, 'id'>>;
  removeTodo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<MutationRemoveTodoArgs, 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  retrieveAllRemovedTodo?: Resolver<Maybe<Array<ResolversTypes['Todo']>>, ParentType, ContextType>;
  retrieveAllTodos?: Resolver<Maybe<Array<ResolversTypes['Todo']>>, ParentType, ContextType>;
  retrieveAllUsers?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  retrieveRemovedTodo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<QueryRetrieveRemovedTodoArgs, 'id'>>;
  retrieveTodo?: Resolver<Maybe<ResolversTypes['Todo']>, ParentType, ContextType, RequireFields<QueryRetrieveTodoArgs, 'id'>>;
  retrieveUserById?: Resolver<ResolversTypes['UserWithSnsType'], ParentType, ContextType>;
  snsType?: Resolver<ResolversTypes['SnsType'], ParentType, ContextType, RequireFields<QuerySnsTypeArgs, 'name'>>;
};

export type SnsTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['SnsType'] = ResolversParentTypes['SnsType']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  content?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  createdDt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  done?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isRemoved?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  orderKey?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  removedDt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedDt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  snsTypeId?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserWithSnsTypeResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserWithSnsType'] = ResolversParentTypes['UserWithSnsType']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  snsType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  snsTypeId?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SnsType?: SnsTypeResolvers<ContextType>;
  Todo?: TodoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserWithSnsType?: UserWithSnsTypeResolvers<ContextType>;
};

