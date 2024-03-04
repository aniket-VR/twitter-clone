"use client"
import {  VERIFY_CURRENT_USER, VERIFY_TOKEN } from '@/graphql/query/user'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import {  ApolloQueryResult, useLazyQuery, useQuery} from '@apollo/client'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import React, { useCallback } from 'react'

export default function GoogleAuth() {
    const {refetch} = useCurrentUser()
    const [getTokenVerify,{data,loading,error}] =  useLazyQuery(VERIFY_TOKEN)
    const handleLoginWithGoogle = useCallback((cred:CredentialResponse)=>{
        const authToken = cred.credential
        if(!authToken) return ("google token not found")
        console.log(authToken)
        getTokenVerify({variables:{token:authToken}})
      },[])
    if(data) {
        window.localStorage.setItem("__twitter_token",data.verifyGoogleToken)
        refetch()
    }
    return (
      <><div className="p-4 bg-gray-700 rounded-lg w-fit m-4">
      <h1 className="text-lg text-white mb-2">New to twitter</h1>
      <GoogleLogin onSuccess={handleLoginWithGoogle}/>
      </div> </>
    )
}


