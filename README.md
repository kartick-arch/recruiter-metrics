# Recruiter Intelligence Dashboard

Static Next.js dashboard. All data is hardcoded — no backend required.

## Deploy to Vercel (3 steps)

### Option A — Vercel CLI (fastest)
```bash
npm install -g vercel
cd recruiter-dashboard
vercel
```
Follow the prompts. Done.

### Option B — GitHub + Vercel UI
1. Push this folder to a new GitHub repo
2. Go to vercel.com → New Project → Import the repo
3. Framework: Next.js (auto-detected)
4. Click Deploy

## Local dev
```bash
npm install
npm run dev
# → http://localhost:3000
```

## Obfuscation map
| Original name        | Obfuscated        |
|----------------------|-------------------|
| subhanshu.mittal     | recruiter.alpha   |
| tanusri.goswami      | recruiter.beta    |
| devanshu.singh       | recruiter.gamma   |
| priya.sharma         | recruiter.delta   |
| rahul.verma          | recruiter.epsilon |
| neha.gupta           | recruiter.zeta    |
| amit.kumar           | recruiter.eta     |
| pooja.mehta          | recruiter.theta   |
| vikram.nair          | recruiter.iota    |
| sunita.rao           | recruiter.kappa   |
| Incedo               | Acme Corp         |

To update any data, edit `lib/data.js`.
