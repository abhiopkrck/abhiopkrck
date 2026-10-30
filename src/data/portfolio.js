export const profile = {
  name: 'Abhishek Boyane',
  role: 'Developer · Game Maker · Automation Builder',
  location: 'India',
  email: 'abhishekboyaneco23859@gmail.com',
  github: 'https://github.com/abhiopkrck',
  linkedin: 'https://linkedin.com/in/abhishek-boyane-826911321',
  instagram: 'https://instagram.com/abhishekboyane3',
  youtube: 'https://youtube.com/@BROABHITM',
  intro: 'I turn curious ideas into useful software. I enjoy building applications, exploring automation, and experimenting with interactive worlds.'
}

export const projects = [
  { id: 'commandos', title: 'CommandOS', category: 'PRODUCTIVITY PLATFORM', description: 'A business operating system for managing projects, tasks, issues and team workflows, with an evolving AI agent workspace.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85', tags: ['React', 'FastAPI', 'Firebase', 'Automation'], status: 'In development', accent: 'violet', icon: '◈', featured: true },
  { id: 'jarvis', title: 'JARVIS Voice Assistant', category: 'VOICE & AI', description: 'A voice-first assistant experiment focused on natural Hinglish interaction and real-time conversational workflows.', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332dbc?auto=format&fit=crop&w=1200&q=85', tags: ['Python', 'LiveKit', 'AI', 'Voice'], status: 'Experiment', accent: 'cyan', icon: '⌁', featured: true },
  { id: 'clinic', title: 'Clinic Management', category: 'HEALTHCARE SOFTWARE', description: 'A clinic workflow application concept for organising patient records and day-to-day clinic operations.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85', tags: ['Python', 'FastAPI', 'Database'], status: 'In development', accent: 'pink', icon: '✳' },
  { id: 'world', title: 'Interactive 3D Portfolio', category: 'GAME DEVELOPMENT', description: 'An exploration of a third-person 3D world where projects, skills and milestones become places to discover.', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=85', tags: ['Unreal Engine', '3D', 'Game Design'], status: 'Experiment', accent: 'orange', icon: '⬡' },
  { id: 'image-lab', title: 'AI Image Studio', category: 'GENERATIVE TOOLS', description: 'A personal image-generation application exploring model integrations and creative workflows.', image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=85', tags: ['React', 'FastAPI', 'AI'], status: 'Experiment', accent: 'green', icon: '✧' },
  { id: 'seo-lab', title: 'Agentic SEO Lab', category: 'AUTOMATION', description: 'An early-stage idea for software that helps analyse websites and coordinate permitted SEO tasks.', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=85', tags: ['React', 'Python', 'Agents'], status: 'Exploring', accent: 'blue', icon: '⌘' }
]

export const skillGroups = [
  { title: 'LANGUAGES', items: ['Python', 'C++', 'JavaScript', 'C', 'HTML', 'CSS'] },
  { title: 'FRONTEND', items: ['React', 'Vite', 'Responsive UI', 'CSS'] },
  { title: 'BACKEND & DATA', items: ['FastAPI', 'Firebase', 'Supabase', 'MySQL', 'SQLite'] },
  { title: 'TOOLS & CREATIVE', items: ['Git', 'GitHub', 'Linux', 'VS Code', 'Unreal Engine'] }
].map(group => ({ ...group, items: group.items.map(name => ({ name, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/' + ({"Python":"python/python-original.svg","C++":"cplusplus/cplusplus-original.svg","JavaScript":"javascript/javascript-original.svg","C":"c/c-original.svg","HTML":"html5/html5-original.svg","CSS":"css3/css3-original.svg","React":"react/react-original.svg","Vite":"vitejs/vitejs-original.svg","Responsive UI":"html5/html5-original.svg","FastAPI":"fastapi/fastapi-original.svg","Firebase":"firebase/firebase-plain.svg","Supabase":"supabase/supabase-original.svg","MySQL":"mysql/mysql-original.svg","SQLite":"sqlite/sqlite-original.svg","Git":"git/git-original.svg","GitHub":"github/github-original.svg","Linux":"linux/linux-original.svg","VS Code":"vscode/vscode-original.svg","Unreal Engine":"unrealengine/unrealengine-original.svg"})[name] })) }))

export const education = [
  { id: 'btech', title: 'B.Tech — Computer Engineering', institution: 'Institution name to be added', period: 'Currently in 3rd year', images: ['https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=85'], detail: 'Exploring computer science through coursework, software projects and hands-on experiments.', image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85', imageAlt: 'University campus building' }
]

export const internships = [
  { id: 'cubeage', title: 'Internship opportunity', organization: 'Cubeage Technology Services Pvt. Ltd.', period: 'Dates and role to be added', detail: 'Add the confirmed designation, responsibilities, technologies and work highlights before publishing this entry.', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85', imageAlt: 'Team collaborating in a modern workplace', status: 'Offer received', certificateImage: '', certificateLabel: 'Internship certificate / offer letter image' }
]

// Add only verified participation, awards, credentials and completed learning here.
export const hackathons = []
export const certifications = []
export const courses = []

export const principles = [
  { number: '01', title: 'Build to understand', text: 'I learn by turning concepts into small working experiments.' },
  { number: '02', title: 'Stay curious', text: 'I explore software, automation, game development and the systems behind them.' },
  { number: '03', title: 'Ship and improve', text: 'Real progress comes from testing, fixing and finishing—not just planning.' }
]