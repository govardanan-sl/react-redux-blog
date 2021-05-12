import React from 'react';
import {addDecorator} from '@storybook/react';
import Center from '../src/Stories/Center/Center';

addDecorator((story) => <Center>{story()}</Center>)
