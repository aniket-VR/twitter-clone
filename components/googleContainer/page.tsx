"use client"
import { VERIFY_CURRENT_USER } from '@/graphql/query/user'
import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import GoogleAuth from '../googleAuth/page'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export default function GoogleContainer() {
    const{data,loading} = useCurrentUser()
   if(loading) return <h1>loading</h1>
   return (
   <>{data?.getCurrentUser!=null ? "" : <GoogleAuth  />}</>
   )
}
