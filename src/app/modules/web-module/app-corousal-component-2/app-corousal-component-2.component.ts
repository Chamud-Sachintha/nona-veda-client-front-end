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
    selector: 'app-app-corousal-component-2',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './app-corousal-component-2.component.html',
    styleUrl: './app-corousal-component-2.component.css',
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
export class AppCorousalComponent2Component implements OnInit,OnDestroy {

    blogPosts: BlogPost[] = [
        {
            id: 1,
            title: 'Santé',
            description: 'Les personnes Kapha ont un métabolisme lent, ce qui peut entraîner une prise de poids, une léthargie, et des troubles respiratoires. Elles sont aussi sujettes à la rétention d\'eau et aux congestions. Pour rester en bonne santé, les Kapha doivent pratiquer une activité physique régulière, consommer des aliments légers et épicés, et éviter la suralimentation et la sédentarité.',
            image: '../../../../assets/images/slide/Santé.png',
            link: '/blog/ashwagandha'
        },
        {
            id: 2,
            title: 'Mode de vie',
            description: 'Pour équilibrer Kapha, il est crucial de rester au chaud en portant des vêtements appropriés et en consommant des aliments réchauffants. Changer de routine aide à combattre la léthargie et la démotivation. Un sommeil régulier, avec un coucher entre 23h et minuit et un réveil entre 6h et 7h, permet de maintenir des niveaux d\'énergie optimaux. Le jeûne occasionnel peut aider à éliminer la lourdeur et à stimuler l\'appétit. L\'exercice régulier et le yoga Kapha, avec des postures spécifiques comme Natarajasana et Ustrasana, dans une ambiance apaisante, sont des actions efficaces pour équilibrer Kapha.',
            image: '../../../../assets/images/slide/Mode de vie.png',
            link: '/blog/turmeric'
        },
        {
            id: 3,
            title: 'Sommeil',
            description: 'Vous vous endormez facilement, mais avez du mal à vous réveiller, préférant les matelas moelleux et les couvertures chaudes. Vos rêves sont souvent paisibles et chargés d’émotions. Vous avez tendance à dormir plus de huit heures, ce qui peut provoquer une sensation de lourdeur et de lenteur au réveil. Pour éviter la léthargie, il est recommandé de vous lever avant le lever du soleil et de limiter la durée de votre sommeil. Aller au lit à une heure raisonnable et se réveiller avant 6 heures du matin vous aidera à entamer la journée avec plus de légèreté et de clarté.',
            image: '../../../../assets/images/slide/Sommeil.png',
            link: '/blog/holy-basil'
        },
        {
            id: 4,
            title: 'Alimentation',
            description: 'Privilégiez des repas chauds, légers et secs, de préférence épicés, comme les cuisines mexicaine ou indienne. Les aliments légèrement cuits ou crus, ainsi que les méthodes de cuisson à sec comme le grillage ou la cuisson au four, sont idéaux. Pour stimuler votre appétit, la laitue romaine, la chicorée, et les épices comme le cumin et le curcuma sont recommandés. Il est conseillé d\'éviter les aliments sucrés, acides, salés, ainsi que les aliments surgelés et l\'eau froide. Un régime pauvre en glucides et en graisses est également favorable pour les Kaphas.',
            image: '../../../../assets/images/slide/Alimentation.png',
            link: '/blog/triphala'
        },
        {
            id: 5,
            title: 'Digestion',
            description: 'Vous avez un appétit fort et constant avec une bonne digestion, mais cela peut vous amener à manger sans réfléchir à la qualité et à la quantité de ce que vous consommez. Vous mangez souvent rapidement et mâchez moins. Prenez le temps de savourer vos repas!',
            image: '../../../../assets/images/slide/Digestion.png',
            link: '/blog/triphala'
        },
        {
            id: 6,
            title: 'Physique',
            description: 'Vous avez un corps solide, bien bâti, avec une ossature robuste et une musculature développée. Votre peau est souvent douce et bien hydratée, vos cheveux sont épais et brillants. Vous pouvez prendre du poids assez facilement.',
            image: '../../../../assets/images/slide/Physique.png',
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
