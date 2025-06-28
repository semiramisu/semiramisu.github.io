/* empty css                                  */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CYD28L1L.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_D_1_3qA2.mjs';
import 'clsx';
import { p as push, a as pop } from '../chunks/_@astro-renderers_BiSpJXdX.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_BiSpJXdX.mjs';
/* empty css                                   */

const ATTR_REGEX = /[&"<]/g;
const CONTENT_REGEX = /[&<]/g;

/**
 * @template V
 * @param {V} value
 * @param {boolean} [is_attr]
 */
function escape_html(value, is_attr) {
	const str = String(value ?? '');

	const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
	pattern.lastIndex = 0;

	let escaped = '';
	let last = 0;

	while (pattern.test(str)) {
		const i = pattern.lastIndex - 1;
		const ch = str[i];
		escaped += str.substring(last, i) + (ch === '&' ? '&amp;' : ch === '"' ? '&quot;' : '&lt;');
		last = i + 1;
	}

	return escaped + str.substring(last);
}

/**
 * `<div translate={false}>` should be rendered as `<div translate="no">` and _not_
 * `<div translate="false">`, which is equivalent to `<div translate="yes">`. There
 * may be other odd cases that need to be added to this list in future
 * @type {Record<string, Map<any, string>>}
 */
const replacements = {
	translate: new Map([
		[true, 'yes'],
		[false, 'no']
	])
};

/**
 * @template V
 * @param {string} name
 * @param {V} value
 * @param {boolean} [is_boolean]
 * @returns {string}
 */
function attr(name, value, is_boolean = false) {
	if (value == null || (!value && is_boolean) || (value === '' && name === 'class')) return '';
	const normalized = (name in replacements && replacements[name].get(value)) || value;
	const assignment = is_boolean ? '' : `="${escape_html(normalized, true)}"`;
	return ` ${name}${assignment}`;
}

function ContactForm($$payload, $$props) {
	push();

	let name = '';
	let email = '';
	let subject = '';
	let message = '';
	let wantsReply = false;
	let isSubmitting = false;

	$$payload.out += `<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="contact-form max-w-2xl mx-auto svelte-e7r5gv"><input type="hidden" name="form-name" value="contact" class="svelte-e7r5gv"> <input type="hidden" name="subject"${attr('value', `【セミラミスの庭】新しいお問い合わせ: ${'件名なし'}`)} class="svelte-e7r5gv"> <p class="hidden"><label class="svelte-e7r5gv">Don't fill this out if you're human: <input name="bot-field" class="svelte-e7r5gv"></label></p> <div class="mb-6"><label for="name" class="block text-sm font-medium mb-2 svelte-e7r5gv">お名前 <span class="text-red-500">*</span></label> <input type="text" id="name" name="name"${attr('value', name)} required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 svelte-e7r5gv" placeholder="山田 太郎"></div> <div class="mb-6"><label for="email" class="block text-sm font-medium mb-2 svelte-e7r5gv">メールアドレス <span class="text-red-500">*</span></label> <input type="email" id="email" name="email"${attr('value', email)} required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 svelte-e7r5gv" placeholder="example@email.com"></div> <div class="mb-6"><label for="subject" class="block text-sm font-medium mb-2 svelte-e7r5gv">件名 <span class="text-red-500">*</span></label> <input type="text" id="subject" name="subject"${attr('value', subject)} required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 svelte-e7r5gv" placeholder="お問い合わせの件名"></div> <div class="mb-6"><label for="message" class="block text-sm font-medium mb-2 svelte-e7r5gv">メッセージ <span class="text-red-500">*</span></label> <textarea id="message" name="message" required rows="6" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 svelte-e7r5gv" placeholder="お問い合わせ内容をご記入ください">`;

	const $$body = escape_html(message);

	if ($$body) {
		$$payload.out += `${$$body}`;
	}

	$$payload.out += `</textarea></div> <div class="mb-6"><label class="flex items-center svelte-e7r5gv"><input type="checkbox"${attr('checked', wantsReply, true)} class="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded svelte-e7r5gv"> <span class="text-sm">返信を希望する</span></label></div> `;

	{
		$$payload.out += '<!--[!-->';
	}

	$$payload.out += `<!--]--> `;

	{
		$$payload.out += '<!--[!-->';
	}

	$$payload.out += `<!--]--> `;

	{
		$$payload.out += '<!--[!-->';
	}

	$$payload.out += `<!--]--> <button type="submit"${attr('disabled', isSubmitting, true)} class="w-full bg-primary-600 text-white py-3 px-6 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors svelte-e7r5gv">${escape_html('送信する')}</button> <p class="mt-4 text-sm text-gray-600 text-center"><span class="text-red-500">*</span> は必須項目です</p></form>`;
	pop();
}

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "\u304A\u554F\u3044\u5408\u308F\u305B - \u30BB\u30DF\u30E9\u30DF\u30B9\u306E\u5EAD", "description": "\u304A\u554F\u3044\u5408\u308F\u305B\u30D5\u30A9\u30FC\u30E0\u3067\u3059\u3002\u3054\u610F\u898B\u30FB\u3054\u611F\u60F3\u30FB\u3054\u8CEA\u554F\u306A\u3069\u304A\u6C17\u8EFD\u306B\u3069\u3046\u305E\u3002", "data-astro-cid-uw5kdbxl": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-12" data-astro-cid-uw5kdbxl> <div class="max-w-4xl mx-auto" data-astro-cid-uw5kdbxl> <h1 class="text-3xl font-bold mb-8 text-center" data-astro-cid-uw5kdbxl>お問い合わせ</h1> <div class="prose prose-lg dark:prose-invert mb-12 max-w-none" data-astro-cid-uw5kdbxl> <p class="text-center mb-8" data-astro-cid-uw5kdbxl>
ブログに関するご意見・ご感想・ご質問など、お気軽にお問い合わせください。
</p> <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8" data-astro-cid-uw5kdbxl> <h2 class="text-xl font-semibold mb-4" data-astro-cid-uw5kdbxl>ご注意事項</h2> <ul class="space-y-2" data-astro-cid-uw5kdbxl> <li data-astro-cid-uw5kdbxl>すべてのお問い合わせに返信できない場合があります。</li> <li data-astro-cid-uw5kdbxl>返信には数日お時間をいただく場合があります。</li> <li data-astro-cid-uw5kdbxl>営業・勧誘等のメールはご遠慮ください。</li> </ul> </div> </div> ${renderComponent($$result2, "ContactForm", ContactForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/s26793/blog/semiramisu.github.io/src/components/ContactForm.svelte", "client:component-export": "default", "data-astro-cid-uw5kdbxl": true })} </div> </main> ` })} `;
}, "/Users/s26793/blog/semiramisu.github.io/src/pages/contact.astro", void 0);

const $$file = "/Users/s26793/blog/semiramisu.github.io/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Contact,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
