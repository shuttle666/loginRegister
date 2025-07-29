import axios from 'axios';

export class VideoLoader {
  constructor() {
    this.controller = null;
    this.videoElement = document.querySelector('video');
  }

  // 加载视频 - 流式播放方式
  loadVideo(url) {
    // 如果已有请求正在进行，则取消它
    if (this.controller) {
      this.controller.abort();
    }

    // 创建新的 AbortController 实例
    this.controller = new AbortController();

    // 直接设置视频源URL，浏览器会自动处理流式加载
    this.videoElement.src = url;

    // 设置视频加载事件监听
    this.videoElement.addEventListener('loadstart', () => console.log('视频开始加载'));
    this.videoElement.addEventListener('canplay', () => console.log('视频可以开始播放'));
    this.videoElement.addEventListener('waiting', () => console.log('视频缓冲中...'));
    this.videoElement.addEventListener('error', (e) => console.error('视频加载错误:', e));

    // 可选：自动开始播放
    // this.videoElement.play().catch(e => console.error('自动播放失败:', e));
  }

  // 取消视频加载
  cancelLoad() {
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }

    // 停止视频加载和播放
    if (this.videoElement) {
      this.videoElement.pause();
      this.videoElement.src = '';
    }
  }

  // 添加分段加载功能（如果需要）
  loadVideoSegment(url, startTime, endTime) {
    this.loadVideo(url);

    // 设置开始时间
    this.videoElement.addEventListener('canplay', () => {
      this.videoElement.currentTime = startTime;
    }, { once: true });

    // 监听结束时间
    if (endTime) {
      this.videoElement.addEventListener('timeupdate', () => {
        if (this.videoElement.currentTime >= endTime) {
          this.videoElement.pause();
        }
      });
    }
  }
}