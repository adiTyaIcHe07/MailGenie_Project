import React from 'react';
import { Grid, Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

function History({ history, promptHistory }) {
    return (
        <Grid container columns={12} spacing={3}>
            <Grid size={12} md={8}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>Recent Replies</Typography>
                        {history.length === 0 ? (
                            <Typography>No recent replies</Typography>
                        ) : (
                            history.map((entry, index) => (
                                <Card key={index} sx={{ mb: 2, p: 2 }}>
                                    <Typography variant="subtitle2">Tone: {entry.tone}</Typography>
                                    <Typography variant="body2">{entry.generatedReply}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {entry.timestamp}
                                    </Typography>
                                </Card>
                            ))
                        )}
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Prompt History</Typography>
                        <List>
                            {promptHistory.map((prompt, index) => (
                                <ListItem key={index} divider>
                                    <ListItemText 
                                        primary={prompt.prompt} 
                                        secondary={`${prompt.tone} • ${prompt.timestamp}`} 
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default History;