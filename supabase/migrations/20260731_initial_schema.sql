-- TERATAI HATI Database Schema Migration
-- Generated for Supabase PostgreSQL

CREATE TABLE IF NOT EXISTS users_profile (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    plan_tier TEXT DEFAULT 'free' CHECK (plan_tier IN ('free', 'pro', 'lifetime')),
    streak_count INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_checkin_date DATE,
    time_zone TEXT DEFAULT 'Asia/Jakarta',
    daily_reminder_enabled BOOLEAN DEFAULT true,
    reminder_time TIME DEFAULT '20:00:00',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    mood_score INT NOT NULL CHECK (mood_score BETWEEN 1 AND 5), -- 5: Sangat Baik, 4: Baik, 3: Biasa, 2: Kurang Baik, 1: Buruk
    mood_label TEXT NOT NULL,
    factors TEXT[] DEFAULT '{}',
    journal_text TEXT,
    ai_guided_question TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS journals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT NOT NULL,
    mood_score INT CHECK (mood_score BETWEEN 1 AND 5),
    mood_label TEXT,
    factors TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS gratitude_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
    items TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS achievements_unlocked (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
    badge_key TEXT NOT NULL,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, badge_key)
);

CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users_profile(id) ON DELETE CASCADE,
    title TEXT DEFAULT 'Sesi Chat CBT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('user', 'ai')),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE gratitude_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements_unlocked ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Default policies for auth.uid() match
CREATE POLICY "Users can manage own profile" ON users_profile FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage own checkins" ON checkins FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own journals" ON journals FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own gratitude" ON gratitude_entries FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own achievements" ON achievements_unlocked FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own chat sessions" ON chat_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own chat messages" ON chat_messages FOR ALL USING (
    EXISTS (SELECT 1 FROM chat_sessions WHERE chat_sessions.id = chat_messages.session_id AND chat_sessions.user_id = auth.uid())
);
