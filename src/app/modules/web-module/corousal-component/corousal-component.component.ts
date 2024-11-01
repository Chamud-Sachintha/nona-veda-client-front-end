import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import $ from 'jquery';
import { CommonModule } from '@angular/common';

interface BlogPost {
    id: number;
    title: string;
    description: string;
    image: string;
    link: string;
}

@Component({
    selector: 'app-corousal-component',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './corousal-component.component.html',
    styleUrl: './corousal-component.component.css',
    animations: [
        trigger('slideAnimation', [
            transition('* => *', [
                style({ transform: '{{startOffset}}' }),
                animate('800ms cubic-bezier(0.645, 0.045, 0.355, 1)', style({ transform: '{{endOffset}}' }))
            ])
        ])
    ],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class CorousalComponentComponent implements OnInit,OnDestroy {

    blogPosts: BlogPost[] = [
        {
            id: 1,
            title: 'The Power of Ashwagandha',
            description: 'Discover the ancient adaptogenic herb that enhances wellness and vitality, backed by modern science and traditional wisdom.',
            image: 'https://images.unsplash.com/photo-1512411233342-92208dfe81af?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            link: '/blog/ashwagandha'
        },
        {
            id: 2,
            title: 'Turmeric: Golden Spice of Life',
            description: 'Explore the remarkable healing properties of turmeric, from inflammation relief to cognitive enhancement.',
            image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            link: '/blog/turmeric'
        },
        {
            id: 3,
            title: 'Healing with Holy Basil',
            description: 'Unveil the sacred properties of Tulsi, the queen of herbs, and its profound impact on physical and spiritual well-being.',
            image: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            link: '/blog/holy-basil'
        },
        {
            id: 4,
            title: 'Benefits of Triphala',
            description: 'Experience the transformative power of this ancient formula for digestive health and natural detoxification.',
            image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            link: '/blog/triphala'
        },
        {
            id: 5,
            title: 'Ayurvedic Daily Routine',
            description: 'Transform your daily routine with ancient Ayurvedic practices for optimal health and inner harmony.',
            image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            link: '/blog/daily-routine'
        }
    ];

    constructor() { }

    currentIndex = 0;
    maxIndex = 0;
    slideWidth = 100;
    autoScrollInterval: any;
    dots: number[] = [];

    ngOnInit() {
        this.updateMaxIndex();
        this.startAutoScroll();
        window.addEventListener('resize', this.updateMaxIndex.bind(this));
        this.updateDots();
    }

    ngOnDestroy() {
        this.stopAutoScroll();
        window.removeEventListener('resize', this.updateMaxIndex.bind(this));
    }

    updateMaxIndex() {
        const width = window.innerWidth;
        let itemsPerView = 4;

        if (width <= 640) {
            itemsPerView = 1;
        } else if (width <= 1024) {
            itemsPerView = 2;
        }

        this.maxIndex = Math.max(0, Math.ceil(this.blogPosts.length - itemsPerView));
        this.slideWidth = 100 / itemsPerView;

        if (this.currentIndex > this.maxIndex) {
            this.currentIndex = this.maxIndex;
        }
    }

    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.resetAutoScroll();
        }
    }

    next() {
        if (this.currentIndex < this.maxIndex) {
            this.currentIndex++;
            this.resetAutoScroll();
        }
    }

    goToSlide(index: number) {
        this.currentIndex = index;
        this.resetAutoScroll();
    }

    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            if (this.currentIndex === this.maxIndex) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
        }, 5000);
    }

    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
        }
    }

    resetAutoScroll() {
        this.stopAutoScroll();
        this.startAutoScroll();
    }

    updateDots() {
        this.dots = Array(this.maxIndex + 1).fill(0);
    }
}
