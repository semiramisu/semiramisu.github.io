<script lang="ts">
  import { onMount } from 'svelte';
  
  let name = $state('');
  let email = $state('');
  let subject = $state('');
  let message = $state('');
  let replyEmail = $state('');
  let wantsReply = $state(false);
  let isSubmitting = $state(false);
  let submitStatus = $state<'idle' | 'success' | 'error'>('idle');
  let errorMessage = $state('');

  // Form validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetForm = () => {
    name = '';
    email = '';
    subject = '';
    message = '';
    replyEmail = '';
    wantsReply = false;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      errorMessage = 'すべての必須フィールドに入力してください。';
      submitStatus = 'error';
      return;
    }

    if (!isValidEmail(email)) {
      errorMessage = '有効なメールアドレスを入力してください。';
      submitStatus = 'error';
      return;
    }

    if (wantsReply && replyEmail && !isValidEmail(replyEmail)) {
      errorMessage = '返信用のメールアドレスが無効です。';
      submitStatus = 'error';
      return;
    }

    isSubmitting = true;
    errorMessage = '';
    
    try {
      // Netlify Forms submission
      const formData = new FormData();
      formData.append('form-name', 'contact');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('message', message);
      if (wantsReply && replyEmail) {
        formData.append('reply-email', replyEmail);
      }

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        submitStatus = 'success';
        resetForm();
      } else {
        throw new Error('送信に失敗しました');
      }
    } catch (error) {
      submitStatus = 'error';
      errorMessage = '送信中にエラーが発生しました。もう一度お試しください。';
    } finally {
      isSubmitting = false;
    }
  };

  onMount(() => {
    // Reset status after showing message
    if (submitStatus !== 'idle') {
      const timer = setTimeout(() => {
        submitStatus = 'idle';
        errorMessage = '';
      }, 5000);
      return () => clearTimeout(timer);
    }
  });
</script>

<form 
  name="contact" 
  method="POST" 
  data-netlify="true" 
  netlify-honeypot="bot-field"
  class="contact-form max-w-2xl mx-auto"
  onsubmit={handleSubmit}
>
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden">
    <label>
      Don't fill this out if you're human: <input name="bot-field" />
    </label>
  </p>

  <div class="mb-6">
    <label for="name" class="block text-sm font-medium mb-2">
      お名前 <span class="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="name"
      name="name"
      bind:value={name}
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      placeholder="山田 太郎"
    />
  </div>

  <div class="mb-6">
    <label for="email" class="block text-sm font-medium mb-2">
      メールアドレス <span class="text-red-500">*</span>
    </label>
    <input
      type="email"
      id="email"
      name="email"
      bind:value={email}
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      placeholder="example@email.com"
    />
  </div>

  <div class="mb-6">
    <label for="subject" class="block text-sm font-medium mb-2">
      件名 <span class="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="subject"
      name="subject"
      bind:value={subject}
      required
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      placeholder="お問い合わせの件名"
    />
  </div>

  <div class="mb-6">
    <label for="message" class="block text-sm font-medium mb-2">
      メッセージ <span class="text-red-500">*</span>
    </label>
    <textarea
      id="message"
      name="message"
      bind:value={message}
      required
      rows="6"
      class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      placeholder="お問い合わせ内容をご記入ください"
    ></textarea>
  </div>

  <div class="mb-6">
    <label class="flex items-center">
      <input
        type="checkbox"
        bind:checked={wantsReply}
        class="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
      />
      <span class="text-sm">返信を希望する</span>
    </label>
  </div>

  {#if wantsReply}
    <div class="mb-6">
      <label for="reply-email" class="block text-sm font-medium mb-2">
        返信先メールアドレス
      </label>
      <input
        type="email"
        id="reply-email"
        name="reply-email"
        bind:value={replyEmail}
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        placeholder="返信を受け取るメールアドレス（任意）"
      />
      <p class="mt-1 text-sm text-gray-600">
        ※ 空欄の場合は、上記のメールアドレスに返信します
      </p>
    </div>
  {/if}

  {#if submitStatus === 'success'}
    <div class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
      お問い合わせを送信しました。ありがとうございます。
    </div>
  {/if}

  {#if submitStatus === 'error'}
    <div class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
      {errorMessage}
    </div>
  {/if}

  <button
    type="submit"
    disabled={isSubmitting}
    class="w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    {isSubmitting ? '送信中...' : '送信する'}
  </button>

  <p class="mt-4 text-sm text-gray-600 text-center">
    <span class="text-red-500">*</span> は必須項目です
  </p>
</form>

<style>
  .contact-form {
    @apply bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm;
  }

  input, textarea {
    @apply dark:bg-gray-700 dark:border-gray-600 dark:text-white;
  }

  label {
    @apply text-gray-700 dark:text-gray-300;
  }

  button {
    @apply font-medium;
  }
</style>