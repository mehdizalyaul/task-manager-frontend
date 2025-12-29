import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

import {AuthProvider, BoardProvider, TasksProvider, TagProvider} from "./contexts/index.js";
import {App} from './App.jsx'

import './reset.css'

const root = document.getElementById('root');

createRoot(root).render(
    <StrictMode>
        <AuthProvider>
            <BoardProvider>
                <TagProvider>
                    <TasksProvider>
                        <App/>
                    </TasksProvider>
                </TagProvider>
            </BoardProvider>
        </AuthProvider>
    </StrictMode>,
)
