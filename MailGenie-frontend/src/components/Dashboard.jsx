import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

function Dashboard({ stats }) {
    return (
        <Grid container columns={12} spacing={3}>
            <Grid size={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Replies Generated</Typography>
                        <Typography variant="h4">{stats.totalRepliesGenerated}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Most Used Tone</Typography>
                        <Typography variant="h4">{stats.mostUsedTone}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Avg. Reply Length</Typography>
                        <Typography variant="h4">{stats.averageReplyLength} chars</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Dashboard;