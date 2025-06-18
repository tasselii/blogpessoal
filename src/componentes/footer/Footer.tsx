import { LinkedinLogo, GithubLogo } from '@phosphor-icons/react'

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-base font-bold'>
                            © 2025 Thiago Tasseli. Todos os direitos reservados. | Copyright: {data}
                        </p>
                    <p className='text-lg'>Minhas Redes Sociais</p>
                    <div className='flex gap-2'>
                      <LinkedinLogo size={48} weight="bold" color="#0A66C2" />
                      <GithubLogo size={48} weight="bold" color="#171515" />    
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer