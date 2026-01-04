<template>
  <div class="about-page">
    <div class="about-card">
      <div class="about-header">
        <i class="fas fa-info-circle"></i>
        <h1>关于本项目</h1>
      </div>

      <div class="about-content">
        <section class="tech-stack">
          <h2><i class="fas fa-code"></i> 技术栈</h2>
          <div class="tech-grid">
            <div class="tech-item">
              <i class="fab fa-vuejs"></i>
              <h3>Vue.js 3</h3>
              <p>使用Composition API和`&lt;script setup&gt;`语法</p>
            </div>
            <div class="tech-item">
              <i class="fas fa-bolt"></i>
              <h3>Vite 5.0</h3>
              <p>现代化的前端构建工具，支持热模块替换</p>
            </div>
            <div class="tech-item">
              <i class="fas fa-route"></i>
              <h3>Vue Router 4</h3>
              <p>客户端路由管理，支持历史记录</p>
            </div>
            <div class="tech-item">
              <i class="fas fa-paint-brush"></i>
              <h3>CSS 3</h3>
              <p>渐变背景、Flexbox、响应式设计</p>
            </div>
          </div>
        </section>

        <section class="project-info">
          <h2><i class="fas fa-project-diagram"></i> 项目信息</h2>
          <div class="info-grid">
            <div class="info-item">
              <i class="fas fa-book"></i>
              <div>
                <h3>项目名称</h3>
                <p>Vue.js Todo应用</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-language"></i>
              <div>
                <h3>界面语言</h3>
                <p>中文</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-calendar"></i>
              <div>
                <h3>创建时间</h3>
                <p>2024年</p>
              </div>
            </div>
            <div class="info-item">
              <i class="fas fa-github"></i>
              <div>
                <h3>项目类型</h3>
                <p>Vue.js 3教程项目</p>
              </div>
            </div>
          </div>
        </section>

        <section class="author-info">
          <h2><i class="fas fa-user"></i> 作者信息</h2>
          <div class="author-card">
            <div class="author-avatar">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="author-details">
              <h3>开发者</h3>
              <p>这是一个Vue.js 3学习项目，展示了从CDN基础应用到现代SFC应用的完整迁移过程。项目使用Vue 3 Composition API和单文件组件(SFC)构建，是一个功能完整的中文Todo应用。</p>
              <div class="contact-links">
                <a href="mailto:example@example.com" class="contact-link">
                  <i class="fas fa-envelope"></i>
                  <span>联系邮箱</span>
                </a>
                <a href="https://github.com" target="_blank" class="contact-link">
                  <i class="fab fa-github"></i>
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
// About页面逻辑
</script>

<style scoped>
.about-page {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.about-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.about-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.about-header i {
  font-size: 2.5rem;
  color: #667eea;
}

.about-header h1 {
  margin: 0;
  color: #333;
  font-size: 2rem;
}

.about-content section {
  margin-bottom: 40px;
}

.about-content h2 {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4a5568;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.about-content h2 i {
  color: #667eea;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.tech-item {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.tech-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.tech-item i {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 10px;
}

.tech-item h3 {
  margin: 10px 0;
  color: #333;
}

.tech-item p {
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.5;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.info-item i {
  font-size: 1.8rem;
  color: #667eea;
  min-width: 40px;
}

.info-item h3 {
  margin: 0 0 5px 0;
  color: #4a5568;
  font-size: 1rem;
}

.info-item p {
  margin: 0;
  color: #718096;
  font-size: 0.9rem;
}

.author-card {
  display: flex;
  gap: 30px;
  background: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
  align-items: center;
}

.author-avatar i {
  font-size: 5rem;
  color: #667eea;
}

.author-details h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.5rem;
}

.author-details p {
  color: #718096;
  line-height: 1.6;
  margin-bottom: 20px;
}

.contact-links {
  display: flex;
  gap: 15px;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.contact-link:hover {
  background: #764ba2;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .author-card {
    flex-direction: column;
    text-align: center;
  }

  .contact-links {
    justify-content: center;
  }

  .tech-grid,
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>