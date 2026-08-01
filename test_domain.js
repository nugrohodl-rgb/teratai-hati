import https from 'https';

console.log('Testing zeh domain...');
https.get('https://expoitzehdwsmsbswaul.supabase.co/rest/v1/', res => {
  console.log('expoitzehdwsmsbswaul (zeh) SUCCESS - status:', res.statusCode);
}).on('error', e => console.error('zeh error:', e.message));

console.log('Testing zhe domain...');
https.get('https://expoitzhehdwsmsbswaul.supabase.co/rest/v1/', res => {
  console.log('expoitzhehdwsmsbswaul (zhe) SUCCESS - status:', res.statusCode);
}).on('error', e => console.error('zhe error:', e.message));
