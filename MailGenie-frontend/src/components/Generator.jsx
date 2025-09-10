import React from 'react';
import { Grid, Card, CardContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress, Box } from '@mui/material';

function Generator({
    emailContent,
    setEmailContent,
    instructions,
    setInstructions,
    tone,
    setTone,
    handleSubmit,
    loading,
    generatedReply,
    handleDownload,
    handleCopy
}) {
    return (
        <Grid container columns={12} spacing={3}>
            <Grid size={12} md={6}>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Email Details
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={6}
                            variant="outlined"
                            label="Original Email"
                            value={emailContent}
                            onChange={(e) => setEmailContent(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            label="Instructions"
                            value={instructions}
                            onChange={(e) => setInstructions(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Tone</InputLabel>
                            <Select
                                value={tone}
                                label="Tone"
                                onChange={(e) => setTone(e.target.value)}
                            >
                                <MenuItem value="Professional">Professional</MenuItem>
                                <MenuItem value="Casual">Casual</MenuItem>
                                <MenuItem value="Friendly">Friendly</MenuItem>
                                <MenuItem value="Playful">Playful</MenuItem>
                            </Select>
                        </FormControl>
                        <Button 
                            fullWidth 
                            variant="contained" 
                            color="primary" 
                            onClick={handleSubmit}
                            disabled={!emailContent || loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Generate Reply"}
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid size={12} md={6}>
                {generatedReply && (
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Generated Reply
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={10}
                                variant="outlined"
                                value={generatedReply}
                                InputProps={{ readOnly: true }}
                                sx={{ mb: 2 }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    onClick={handleDownload}
                                >
                                    Download
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    onClick={handleCopy}
                                >
                                    Copy To clipboard
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Grid>
        </Grid>
    );
}

export default Generator;