-- Seed initial data for categories
INSERT INTO public.categories (name)
VALUES ('React'), ('TypeScript'), ('Node.js'), ('CSS'), ('Git'), ('Dev')
ON CONFLICT (name) DO NOTHING;

-- Seed initial data for posts
INSERT INTO public.posts (title, content, category, thumbnail_url)
VALUES 
('React Hooks 심층 분석', 'React Hooks의 작동 원리와 최적의 사용법을 알아봅니다.', 'React', 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop'),
('고급 TypeScript 패턴', 'TypeScript의 제네릭, 매핑된 타입 등 고급 기능을 마스터하세요.', 'TypeScript', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop'),
('Node.js 성능 최적화 가이드', 'V8 엔진의 이해와 이벤트 루프 병목 지점 해결 방법.', 'Node.js', 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop'),
('모던 CSS 레이아웃 완벽 정리', 'Flexbox와 Grid를 활용한 최신 레이아웃 구현 기법.', 'CSS', 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop'),
('Git Rebase Interactive 마스터하기', '깔끔한 커밋 내역 관리를 위한 Git Rebase 활용법.', 'Git', 'https://images.unsplash.com/photo-1556075798-4825dfabb16e?auto=format&fit=crop&q=80&w=2070'),
('2024년 필수 VS Code 확장 프로그램', '개발 생산성을 극대화하는 추천 확장 프로그램 리스트.', 'Dev', 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop');
