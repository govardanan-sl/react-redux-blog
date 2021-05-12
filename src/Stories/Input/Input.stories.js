import React from 'react';
import Input from './Input';


export default{
    title:'Form/Input',
    component:Input
}

export const Small = () => <Input size='sm' placeholder='Enter Name' type='text'></Input>

export const Medium = () => <Input size='md' placeholder='Enter Email' type='email'></Input>

Small.storyName ='Small Input Box'