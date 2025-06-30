class LotterySystem {
    constructor() {
        this.currentRound = 1;
        this.isRolling = false;
        this.rollInterval = null;
        this.winners = [];
        this.candidates = ["张明", "李华", "王强", "刘芳", "陈静", "赵磊", "孙萌", "周杰", "吴婷", "郑浩"];
        
        // 抽奖配置 - 每轮的指定中奖人和候选人名单
        this.lotteryConfig = [
            {
                round: 1,
                winner: "杨志华",
                prize: "中奖",
                candidates: this.candidates
            },
            {
                round: 2,
                winner: "李明泽",
                prize: "中奖",
                candidates: this.candidates
            },
            {
                round: 3,
                winner: "贾素琴",
                prize: "中奖",
                candidates: this.candidates
            },
            {
                round: 4,
                winner: "吴昕",
                prize: "中奖",
                candidates: this.candidates
            },
            {
                round: 5,
                winner: "郝依蔓",
                prize: "中奖",
                candidates: this.candidates
            },
            {
                round: 6,
                winner: "张凯捷",
                prize: "中奖",
                candidates: this.candidates
            }
        ];
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }
    
    initializeElements() {
        this.displayName = document.getElementById('displayName');
        this.currentRoundElement = document.getElementById('currentRound');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.winnersList = document.getElementById('winnersList');
        this.confettiContainer = document.getElementById('confetti');
    }
    
    bindEvents() {
        this.startBtn.addEventListener('click', () => this.startLottery());
        this.stopBtn.addEventListener('click', () => this.stopLottery());
    }
    
    updateDisplay() {
        this.currentRoundElement.textContent = this.currentRound;
        const progress = ((this.currentRound - 1) / 6) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `${this.currentRound - 1}/6 轮完成`;
        
        if (this.currentRound > 6) {
            this.currentRoundElement.textContent = '-'
            this.progressText.textContent = `6轮已全部完成`
            this.displayName.textContent = "🎉 所有抽奖已完成 🎉";
            this.startBtn.disabled = true;
            this.startBtn.textContent = "抽奖结束";
        }
    }
    
    startLottery() {
        if (this.currentRound > 6 || this.isRolling) return;
        
        this.isRolling = true;
        this.startBtn.disabled = true;
        this.stopBtn.disabled = false;
        
        // 显示等待样式
        this.displayName.textContent = "抽奖中...";
        this.displayName.classList.add('waiting');
        
        // 2-5秒后自动停止（随机时间增加悬念）
        const autoStopTime = 2000 + Math.random() * 3000;
        setTimeout(() => {
            if (this.isRolling) {
                this.stopLottery();
            }
        }, autoStopTime);
    }
    
    stopLottery() {
        if (!this.isRolling) return;
        
        this.isRolling = false;
        
        const currentConfig = this.lotteryConfig[this.currentRound - 1];
        
        // 移除等待样式，显示最终中奖者（指定的中奖人）
        this.displayName.classList.remove('waiting');
        this.displayName.textContent = currentConfig.winner;
        this.displayName.classList.add('winner-revealed');
        
        // 添加中奖者到列表
        this.winners.push({
            round: this.currentRound,
            name: currentConfig.winner,
            prize: currentConfig.prize
        });
        
        // 更新中奖名单显示
        this.updateWinnersList();
        
        // 播放彩带动画
        this.showConfetti();
        
        // 重置按钮状态
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        
        // 准备下一轮
        this.currentRound++;
        this.updateDisplay();
        
        if (this.currentRound <= 6) {
            this.startBtn.textContent = "开始下一轮";
        }
        
        setTimeout(() => {
            this.displayName.classList.remove('winner-revealed');
        }, 1000);
    }
    
    updateWinnersList() {
        this.winnersList.innerHTML = '';
        
        this.winners.forEach((winner, index) => {
            const winnerItem = document.createElement('div');
            winnerItem.className = 'winner-item';
            winnerItem.innerHTML = `
                <div class="winner-round">第${winner.round}轮</div>
                <div class="winner-name">${winner.name}</div>
                <div class="winner-prize">${winner.prize}</div>
            `;
            
            // 添加延迟动画效果
            setTimeout(() => {
                this.winnersList.appendChild(winnerItem);
            }, index * 200);
        });
    }
    
    showConfetti() {
        // 清除之前的彩带
        this.confettiContainer.innerHTML = '';
        
        // 创建彩带效果
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            this.confettiContainer.appendChild(confetti);
        }
        
        // 3秒后清除彩带
        setTimeout(() => {
            this.confettiContainer.innerHTML = '';
        }, 5000);
    }
}

// 页面加载完成后初始化抽奖系统
document.addEventListener('DOMContentLoaded', () => {
    new LotterySystem();
});

// 添加一些额外的交互效果
document.addEventListener('DOMContentLoaded', () => {
    // 添加鼠标悬停效果
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            if (!button.disabled) {
                button.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (!button.disabled) {
                button.style.transform = 'translateY(0)';
            }
        });
    });
    
    // 添加键盘快捷键支持
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            const startBtn = document.getElementById('startBtn');
            const stopBtn = document.getElementById('stopBtn');
            
            if (!startBtn.disabled) {
                startBtn.click();
            } else if (!stopBtn.disabled) {
                stopBtn.click();
            }
        }
    });
});
