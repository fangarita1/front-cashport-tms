"use client"
import { Flex } from 'antd';
import React from 'react';

interface ProviderDetailProps {
  params: { id: string }
}

export default function ProviderDetail({params}: ProviderDetailProps) {
  return (
    <Flex>
      <div>Detail</div>
    </Flex>
  )
}