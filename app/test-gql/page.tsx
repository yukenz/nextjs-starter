"use client"

import * as React from "react"
import {graphql} from '@/graphql/gql'
import {execute} from '@/graphql/execute'
import {useQuery} from '@tanstack/react-query'

const TransferQuery = graphql(`
    query Transfer {
      accounts {
        items {
          amount
          from
          id
          to
        }
        totalCount
      }
    }`)

export default function Page() {

    const {data, isSuccess,} = useQuery({
        queryKey: ['transfer'],
        queryFn: () => execute(TransferQuery)
    })


    if (isSuccess)
        return (<>
            {
                data?.accounts.items.map((item) => (
                    <p>{item.from} ➡ {item.to} ({item.amount} USDT)</p>
                ))
            }
        </>)

    return (
        <p>Loading</p>
    )
}
