import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

async function getPolicyData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/policy`, {
    cache: "no-store",
  })
  if (!res.ok) return null
  return res.json()
}

export default async function PolicyPage() {
  const policyData = await getPolicyData()

  if (!policyData) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Library Goal</h1>
        <p className="text-muted-foreground">To cater to the needs of Library Users in the least possible time.</p>
      </div>

      <Tabs defaultValue="vision">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vision">Vision & Mission</TabsTrigger>
          <TabsTrigger value="objectives">Objectives</TabsTrigger>
        </TabsList>

        <TabsContent value="vision" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {policyData.vision.map((visionItem: string, index: number) => (
                    <li key={index}>{visionItem}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {policyData.mission.map((missionItem: string, index: number) => (
                    <li key={index}>{missionItem}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <CardHeader>
                  <CardTitle>Circulation Policy</CardTitle>
                </CardHeader>
                <h1 className="list-disc pl-5 space-y-2"></h1>
                {policyData.circulationPolicy.map((rule: string, index: number) => (
                  <div key={index}>{rule}</div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>General Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {policyData.generalPolicy.map((rule: string, index: number) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle lang="en">Return and Fine Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {policyData.finePolicy.map((rule: string, index: number) => (
                    <li key={index}>{rule}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="objectives" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Our Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {policyData.objectives.map((objective: string, index: number) => (
                  <li key={`objective-${index}`}>{objective}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
