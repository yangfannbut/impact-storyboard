import storiesData from '../mock/stories.json';

// simulate real-world 800ms network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchStories = async (filterTag = 'all') => {
  await delay(800); 
  
  if (filterTag === 'all') {
    return storiesData;
  }
  return storiesData.filter(story => story.tags.includes(filterTag));
};