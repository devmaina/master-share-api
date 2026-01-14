/**
 * Master Share API v1.0
 * Developed by Mainadev of IBConcept
 * Universal sharing logic for WordPress, Wix, Shopify, etc.
 */
(function() {
    const API_ENDPOINT = 'https://api.mastershare.api/v1/product/';

    class MasterShare {
        constructor() {
            this.init();
        }

        init() {
            // Listen for clicks on elements with the 'share-product' class
            document.addEventListener('click', (e) => {
                const target = e.target.closest('.share-product');
                if (target) {
                    const productId = target.getAttribute('data-id');
                    this.handleShare(productId, target);
                }
            });
        }

        async handleShare(id, element) {
            const originalText = element.innerText;
            element.innerText = 'Connecting...';
            
            try {
                // In a real scenario, this fetches structured metadata for the specific product
                // optimized for social graphs (OG tags, Twitter cards, etc.)
                const productData = await this.fetchProductData(id);
                
                if (navigator.share) {
                    await navigator.share({
                        title: productData.name,
                        text: `Check out this ${productData.category}: ${productData.description}`,
                        url: productData.shareUrl || window.location.href,
                    });
                } else {
                    // Fallback for browsers without Web Share API
                    this.copyToClipboard(productData.shareUrl || window.location.href);
                    element.innerText = 'Link Copied!';
                    setTimeout(() => element.innerText = originalText, 2000);
                    return;
                }
            } catch (err) {
                console.error('Master Share Error:', err);
            } finally {
                if (element.innerText !== 'Link Copied!') {
                    element.innerText = originalText;
                }
            }
        }

        async fetchProductData(id) {
            // Simulated API call to get specific product intelligence
            // This replaces the need for manual image uploads in social managers
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        name: "Premium Product",
                        description: "Shared via Master Share API",
                        category: "Electronics/Automotive",
                        shareUrl: window.location.href + "?ref=mastershare&pid=" + id
                    });
                }, 800);
            });
        }

        copyToClipboard(text) {
            const el = document.createElement('textarea');
            el.value = text;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    }

    // Initialize once DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new MasterShare());
    } else {
        new MasterShare();
    }
})();
