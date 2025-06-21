# Newsletter Setup with Mailjet

This project includes a fully functional newsletter signup system using Mailjet. Follow these steps to configure it:

## 1. Create a Mailjet Account

1. Go to [Mailjet](https://www.mailjet.com/) and create an account
2. Verify your email address and complete the setup process

## 2. Get Your API Credentials

1. Log into your Mailjet dashboard
2. Go to **Account Settings** > **Master API Key & Sub API key management**
3. Copy your **API Key** and **Secret Key**

## 3. Create a Contact List (Optional)

1. In your Mailjet dashboard, go to **Contacts** > **Contact Lists**
2. Create a new list (e.g., "Website Newsletter Subscribers")
3. Note the List ID from the URL or list settings

## 4. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your Mailjet credentials:

```bash
cp .env.example .env.local
```

Update the following variables in `.env.local`:

```env
# Mailjet configuration for newsletter functionality
MAILJET_API_KEY=your_actual_api_key_here
MAILJET_SECRET_KEY=your_actual_secret_key_here
MAILJET_LIST_ID=your_list_id_here_optional
MAILJET_FROM_EMAIL=noreply@yourdomain.com
MAILJET_SEND_WELCOME=true
```

### Environment Variables Explained:

- **MAILJET_API_KEY**: Your Mailjet API key
- **MAILJET_SECRET_KEY**: Your Mailjet secret key
- **MAILJET_LIST_ID**: (Optional) Specific contact list ID. If not provided, contacts will be added to your general contact list
- **MAILJET_FROM_EMAIL**: The email address that welcome emails will be sent from
- **MAILJET_SEND_WELCOME**: Set to `true` to send welcome emails, `false` to disable

## 5. Verify Your Sender Domain (For Production)

For production use, you'll need to verify your sender domain:

1. In Mailjet dashboard, go to **Account Settings** > **Sender domains & addresses**
2. Add and verify your domain
3. Update `MAILJET_FROM_EMAIL` to use your verified domain

## 6. Test the Newsletter

1. Start your development server: `pnpm dev`
2. Navigate to your homepage
3. Scroll down to the newsletter signup section
4. Enter a test email address and click "Subscribe Now"
5. Check your Mailjet dashboard to see if the contact was added

## Features

### Newsletter Signup Component

The newsletter signup includes:

- **Email validation**: Client-side and server-side validation
- **Loading states**: Visual feedback during submission
- **Success/Error messages**: Clear user feedback
- **Responsive design**: Works on all screen sizes
- **Duplicate handling**: Graceful handling of already subscribed emails

### API Endpoint

The `/api/newsletter` endpoint:

- Validates email format
- Adds contacts to Mailjet
- Sends optional welcome emails
- Handles errors gracefully
- Returns appropriate HTTP status codes

### Welcome Email

If enabled, new subscribers receive a welcome email with:

- Branded HTML design matching your site
- Information about what they'll receive
- Professional styling with your color scheme

## Customization

### Styling

The newsletter component uses Tailwind CSS classes and can be customized by modifying:

- `src/ui/components/NewsletterSignup.tsx` - The main component
- `src/app/[channel]/(main)/page.tsx` - The page layout

### Welcome Email Template

Customize the welcome email by editing the `HTMLPart` in:
`src/app/api/newsletter/route.ts`

### Error Handling

The system handles various error scenarios:

- Invalid email format
- Network errors
- Mailjet API errors
- Already subscribed emails
- Missing configuration

## Troubleshooting

### Common Issues

1. **"Newsletter service not configured" error**

   - Check that `MAILJET_API_KEY` and `MAILJET_SECRET_KEY` are set in your `.env.local`

2. **Emails not being sent**

   - Verify your sender domain in Mailjet
   - Check that `MAILJET_SEND_WELCOME=true`
   - Ensure `MAILJET_FROM_EMAIL` uses a verified domain

3. **Contacts not appearing in specific list**

   - Verify the `MAILJET_LIST_ID` is correct
   - Check that the list exists in your Mailjet account

4. **API errors**
   - Check the server console for detailed error messages
   - Verify your Mailjet credentials are correct
   - Ensure your Mailjet account is active

### Testing

You can test the API endpoint directly:

```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Production Deployment

For production:

1. Set up environment variables in your hosting platform
2. Verify your sender domain in Mailjet
3. Test the newsletter signup thoroughly
4. Monitor the Mailjet dashboard for delivery statistics

### Docker Deployment

The Dockerfile has been updated to include Mailjet environment variables. When building the Docker image, you need to pass the Mailjet variables as build arguments:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SALEOR_API_URL=your_saleor_url \
  --build-arg NEXT_PUBLIC_STOREFRONT_URL=your_storefront_url \
  --build-arg MAILJET_API_KEY=your_mailjet_api_key \
  --build-arg MAILJET_SECRET_KEY=your_mailjet_secret_key \
  --build-arg MAILJET_LIST_ID=your_mailjet_list_id \
  --build-arg MAILJET_FROM_EMAIL=your_from_email \
  --build-arg MAILJET_SEND_WELCOME=true \
  -t your-app-name .
```

### CI/CD Configuration

For GitHub Actions or other CI/CD platforms, ensure you have the following secrets configured:

- `MAILJET_API_KEY`
- `MAILJET_SECRET_KEY`
- `MAILJET_LIST_ID` (optional)
- `MAILJET_FROM_EMAIL`
- `MAILJET_SEND_WELCOME`

### Vercel Deployment

If deploying to Vercel, add the environment variables in your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add all the Mailjet variables listed above
4. Redeploy your application

### Build-time vs Runtime

The newsletter API route now uses lazy initialization of the Mailjet client, which means:

- **Build time**: Environment variables are available but the Mailjet client is not instantiated
- **Runtime**: The Mailjet client is created only when the API endpoint is called

This prevents build failures when environment variables are not available during the build process.

## Support

For Mailjet-specific issues, consult the [Mailjet Documentation](https://dev.mailjet.com/).

For implementation questions, check the code comments in:

- `src/app/api/newsletter/route.ts`
- `src/ui/components/NewsletterSignup.tsx`
