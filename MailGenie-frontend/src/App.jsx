import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Paper, Typography, Box, Button, Divider } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { saveAs } from 'file-saver';
import theme from './components/Theme';
import Generator from './components/Generator';
import Dashboard from './components/Dashboard';
import History from './components/History';
import { ThemeProvider } from '@mui/material/styles';

function App() {
    const [activeTab, setActiveTab] = useState('generator');
    const [emailContent, setEmailContent] = useState('');
    const [instructions, setInstructions] = useState('');
    const [tone, setTone] = useState('');
    const [generatedReply, setGeneratedReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState({
        totalRepliesGenerated: 0,
        mostUsedTone: 'N/A',
        averageReplyLength: 0
    });

    const [promptHistory, setPromptHistory] = useState([
        { prompt: "Client project update", tone: "Professional", timestamp: new Date().toLocaleString() },
        { prompt: "Team collaboration", tone: "Friendly", timestamp: new Date().toLocaleString() },
        { prompt: "Sales pitch follow-up", tone: "Casual", timestamp: new Date().toLocaleString() }
    ]);

    async function handleSubmit() {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:9191/api/email/generate", {
                emailContent,
                instructions,
                tone
            });
            
            const newReply = response.data;
            setGeneratedReply(newReply);
            
            const newHistoryEntry = {
                originalEmail: emailContent,
                generatedReply: newReply,
                tone: tone || 'Unspecified',
                timestamp: new Date().toLocaleString()
            };
            
            setHistory(prevHistory => [newHistoryEntry, ...prevHistory].slice(0, 3));
            
            setStats(prev => ({
                totalRepliesGenerated: prev.totalRepliesGenerated + 1,
                mostUsedTone: tone || prev.mostUsedTone,
                averageReplyLength: Math.round((prev.averageReplyLength * prev.totalRepliesGenerated + newReply.length) / (prev.totalRepliesGenerated + 1))
            }));

            toast.success("Reply Generated Successfully");
        } catch (err) {
            toast.error("Generation Failed");
        } finally {
            setLoading(false);
        }
    }

    const handleDownload = () => {
        const blob = new Blob([generatedReply], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, "email_reply.txt");
        toast.success("Downloaded");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedReply);
        toast.success("Copied to Clipboard");
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" sx={{ py: 4, backgroundColor: theme.palette.background.default }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography 
                        variant="h4" 
                        align="center" 
                        gutterBottom 
                        sx={{ 
                            color: theme.palette.primary.main, 
                            mb: 4 
                        }}
                    >
                        Email Reply Generator
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Button 
                            variant={activeTab === 'generator' ? 'contained' : 'outlined'} 
                            color="primary" 
                            onClick={() => setActiveTab('generator')}
                            sx={{ mr: 2 }}
                        >
                            Generator
                        </Button>
                        <Button 
                            variant={activeTab === 'dashboard' ? 'contained' : 'outlined'} 
                            color="primary" 
                            onClick={() => setActiveTab('dashboard')}
                            sx={{ mr: 2 }}
                        >
                            Dashboard
                        </Button>
                        <Button 
                            variant={activeTab === 'history' ? 'contained' : 'outlined'} 
                            color="primary" 
                            onClick={() => setActiveTab('history')}
                        >
                            History
                        </Button>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    {activeTab === 'generator' && (
                        <Generator
                            emailContent={emailContent}
                            setEmailContent={setEmailContent}
                            instructions={instructions}
                            setInstructions={setInstructions}
                            tone={tone}
                            setTone={setTone}
                            handleSubmit={handleSubmit}
                            loading={loading}
                            generatedReply={generatedReply}
                            handleDownload={handleDownload}
                            handleCopy={handleCopy}
                        />
                    )}
                    {activeTab === 'dashboard' && <Dashboard stats={stats} />}
                    {activeTab === 'history' && <History history={history} promptHistory={promptHistory} />}
                </Paper>

                <ToastContainer 
                    position="bottom-right" 
                    autoClose={3000} 
                    hideProgressBar 
                    theme="colored" 
                />
            </Container>
        </ThemeProvider>
    );
}

export default App;